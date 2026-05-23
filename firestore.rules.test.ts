import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { beforeAll, afterAll, beforeEach, describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

let testEnv: any;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'demo-test-project',
    firestore: {
      rules: readFileSync(resolve(__dirname, 'firestore.rules'), 'utf8'),
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

describe('Firestore Security Rules: 战锤40K：无尽战火', () => {
  const adminEmail = 'lastry-thone@hotmail.com';
  const playerA = { uid: 'player-a', email: 'a@example.com', email_verified: true };
  const playerB = { uid: 'player-b', email: 'b@example.com', email_verified: true };
  const unverified = { uid: 'player-u', email: 'u@example.com', email_verified: false };
  const admin = { uid: 'admin-1', email: adminEmail, email_verified: true };

  it('Payload 1: Identity Spoofing - Cannot create game under another user UID', async () => {
    const db = testEnv.authenticatedContext(playerA.uid, playerA).firestore();
    const gameRef = db.doc(`games/${playerB.uid}`);
    await assertFails(gameRef.set({
      status: 'START_MENU',
      difficulty: 'normal',
      lastUpdated: testEnv.firestore.serverTimestamp(),
    }));
  });

  it('Payload 2: Ghost Field Injection - Reject unexpected fields like isVerified', async () => {
    const db = testEnv.authenticatedContext(playerA.uid, playerA).firestore();
    const gameRef = db.doc(`games/${playerA.uid}`);
    await assertFails(gameRef.set({
      status: 'START_MENU',
      difficulty: 'normal',
      lastUpdated: testEnv.firestore.serverTimestamp(),
      isVerified: true // Ghost field
    }));
  });

  it('Payload 3: Log Alteration - Rules treat overwrites via setDoc safely via isValidLog', async () => {
    const db = testEnv.authenticatedContext(playerA.uid, playerA).firestore();
    const logRef = db.doc(`games/${playerA.uid}/logs/log1`);
    
    // Create valid first
    await assertSucceeds(db.doc(`games/${playerA.uid}`).set({
       status: 'PLAYING',
       difficulty: 'normal',
       lastUpdated: testEnv.firestore.FieldValue.serverTimestamp()
    }));
    await assertSucceeds(logRef.set({
      id: 'log1',
      timestamp: 123456789,
      title: 'Title',
      date: 'Date',
      days: []
    }));

    // Alteration with ghost field should fail
    await assertFails(logRef.set({
      id: 'log1',
      timestamp: 123456789,
      title: 'Title',
      date: 'Date',
      days: [],
      isVerified: true
    }));
  });

  it('Payload 4: Time Travel - Client timestamp fails', async () => {
    const db = testEnv.authenticatedContext(playerA.uid, playerA).firestore();
    const gameRef = db.doc(`games/${playerA.uid}`);
    await assertFails(gameRef.set({
      status: 'START_MENU',
      difficulty: 'normal',
      lastUpdated: 1690000000000 // Not server timestamp
    }));
  });

  it('Payload 5: NPC Scraping - List on non-owned games fails', async () => {
    const db = testEnv.authenticatedContext(playerA.uid, playerA).firestore();
    const npcCollection = db.collection(`games/${playerB.uid}/npcs`);
    await assertFails(npcCollection.get());
  });

  it('Payload 6: ID Poisoning - >128 length IDs rejected', async () => {
    const db = testEnv.authenticatedContext(playerA.uid, playerA).firestore();
    const longId = 'a'.repeat(129);
    const npcRef = db.doc(`games/${playerA.uid}/npcs/${longId}`);
    await assertFails(npcRef.set({
      id: longId,
      name: 'Test',
      lastUpdated: testEnv.firestore.FieldValue.serverTimestamp()
    }));
  });

  it('Payload 7: Role Escalation - User sending admin=true drops', async () => {
    const db = testEnv.authenticatedContext(playerA.uid, playerA).firestore();
    const adminRef = db.doc(`admins/${playerA.uid}`);
    await assertFails(adminRef.set({ role: 'admin' }));
  });

  it('Payload 8: Resource Exhaustion - 1MB content string rejected', async () => {
    const db = testEnv.authenticatedContext(playerA.uid, playerA).firestore();
    const msgRef = db.doc(`games/${playerA.uid}/history/msg1`);
    const hugeContent = 'a'.repeat(200000);
    await assertFails(msgRef.set({
      id: 'msg1',
      role: 'user',
      content: hugeContent
    }));
  });

  it('Payload 9: Terminal State Locking - Cannot update game after GAME_OVER', async () => {
    const db = testEnv.authenticatedContext(playerA.uid, playerA).firestore();
    const gameRef = db.doc(`games/${playerA.uid}`);
    
    // Set to GAME_OVER
    await assertSucceeds(gameRef.set({
      status: 'GAME_OVER',
      difficulty: 'normal',
      lastUpdated: testEnv.firestore.FieldValue.serverTimestamp(),
    }));

    // Attempt to reset to PLAYING should fail
    await assertFails(gameRef.update({
      status: 'PLAYING',
      lastUpdated: testEnv.firestore.FieldValue.serverTimestamp(),
    }));
  });

  it('Payload 10: Immutability - Cannot change email or createdAt in UserProfile', async () => {
    const db = testEnv.authenticatedContext(playerA.uid, playerA).firestore();
    const userRef = db.doc(`users/${playerA.uid}`);
    
    const initialData = {
      email: playerA.email,
      displayName: 'Player A',
      photoURL: 'https://example.com/photo.jpg',
      createdAt: testEnv.firestore.FieldValue.serverTimestamp(),
    };

    await assertSucceeds(userRef.set(initialData));

    // Attempt to change email should fail
    await assertFails(userRef.update({
      email: 'hacker@example.com',
    }));

    // Attempt to change displayName should succeed
    await assertSucceeds(userRef.update({
      displayName: 'New Name',
    }));
  });

  it('Payload 11: Size Enforcement - NPC name too long fails', async () => {
    const db = testEnv.authenticatedContext(playerA.uid, playerA).firestore();
    const npcRef = db.doc(`games/${playerA.uid}/npcs/npc1`);
    const longName = 'a'.repeat(201);
    
    await assertFails(npcRef.set({
      id: 'npc1',
      name: longName,
      lastUpdated: testEnv.firestore.FieldValue.serverTimestamp(),
      aiGeneratedRecord: 'Record',
      userNotes: 'Notes',
      status: 'Status',
      tags: [],
      records: [],
      bondLevel: 0,
      resistance: 'Low',
      nextMilestone: 'None'
    }));
  });

  it('Payload 12: Anonymous Access - Unauthenticated read fails', async () => {
    const db = testEnv.unauthenticatedContext().firestore();
    const gameRef = db.doc(`games/${playerA.uid}`);
    await assertFails(gameRef.get());
  });
});
