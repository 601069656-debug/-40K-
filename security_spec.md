# Firestore Security Specification

1. Data Invariants:
   - A GameState can only be owned by the authenticated user matching the userId in the path `/games/{userId}`.
   - NPCs and Logs in `/games/{userId}/{subcollection}/{id}` must be owned by the user matching the userId.
   - Any write must be validated by dedicated `isValid[Entity]` helpers.

2. The "Dirty Dozen" Payloads (examples):
   - Payload to `/games/{otherUserId}` (should fail if not owner)
   - Payload to `/games/{userId}` missing `lastUpdated` (should fail)
   - Payload to `/games/{userId}/npcs/{npcId}` with massive `name` (>200) (should fail)
   - Payload to `/games/{userId}/history/{msgId}` with `role` = 'god' (should fail)

3. Test Runner (firestore.rules.test.ts):
   - I have an existing `firestore.rules.test.ts`, I should update it to make sure it covers these scenarios.
