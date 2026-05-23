import fs from 'fs';
const filePath = 'components/CharacterSheet.tsx';
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

const startLine = 762; // return (
const endLine = 951;   // );

const replacement = `                          return (
                            <div 
                              key={\`eq-\${idx}\`}
                              draggable={!!item}
                              onDragStart={(e) => handleDragStart(e, 'EQUIPMENT', idx)}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => handleDrop(e, 'EQUIPMENT', idx)}
                              onClick={() => {
                                if (isEditing) {
                                  setArmoryTargetSlot(idx);
                                  setArmoryTargetType('EQUIPMENT');
                                  setIsArmoryModalOpen(true);
                                }
                              }}
                              className={\`group relative min-h-[140px] border transition-all \${isEditing || item ? 'cursor-pointer' : ''} overflow-visible p-0 flex flex-col \${
                                item 
                                  ? 'border-blue-900/40 bg-zinc-950 hover:border-blue-500 shadow-[inset_0_0_40px_rgba(30,58,138,0.1)]' 
                                  : 'border-zinc-900 bg-black/40 border-dashed hover:border-blue-900/50'
                              }\`}
                            >
                              <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-zinc-800 pointer-events-none z-0">
                                 SLOT_{String(idx + 1).padStart(2, '0')}
                              </div>

                              {item ? (
                                <>
                                  <div className="p-4 flex-1 relative z-10">
                                     <div className="text-[9px] text-blue-900 font-black uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                        <span className="w-1 h-3 bg-blue-900/50" />
                                        {item.category}
                                     </div>
                                     <div className="text-sm font-black text-slate-100 group-hover:text-blue-400 transition-colors uppercase leading-tight mb-3">
                                        {item.name} {item.count > 1 && <span className="text-blue-500 font-mono text-xs">(x{item.count})</span>}
                                     </div>
                                     
                                     {/* Hover Details Overlay */}
                                     <div className="absolute inset-0 bg-zinc-950/95 p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 z-[30] flex flex-col border-2 border-blue-900/50 shadow-[inset_0_0_40px_rgba(30,58,138,0.3)] overflow-y-auto custom-scrollbar pointer-events-none">
                                       <div className="text-[8px] text-blue-600 font-black mb-3 tracking-[0.4em] uppercase border-b border-blue-900 pb-1 w-fit">Tech_Specification</div>
                                       <p className="text-[11px] text-zinc-100 font-mono leading-relaxed mb-4">{item.description || item.stats?.desc || '无详细技术参数文档。'}</p>
                                        {(() => {
                                          const daemonStats = getDaemonWeaponStats(item, character.corruptionValue || 0);
                                          if (daemonStats) {
                                            return (
                                              <div className="mb-4 bg-purple-900/20 border border-purple-500/30 p-2">
                                                <div className="text-[8px] text-purple-400 font-black uppercase mb-1 flex items-center gap-1">
                                                  <Zap size={8} /> 混沌增幅 / CHAOS_INFUSED
                                                </div>
                                                <div className="flex gap-4">
                                                  <div className="text-[10px] text-zinc-300 font-mono">POWER: <span className="text-blue-400 font-black">{daemonStats.power}</span></div>
                                                  <div className="text-[10px] text-zinc-300 font-mono">DAMAGE: <span className="text-red-400 font-black">{daemonStats.damage}</span></div>
                                                </div>
                                                <div className="text-[7px] text-purple-600 font-mono mt-1 uppercase italic"> stats overwritten by entity daemon</div>
                                              </div>
                                            );
                                          }
                                          return null;
                                        })()}
                                        {item.modes && item.modes.length > 0 ? (
                                          <div className="space-y-4">
                                            {item.modes.map((mode, midx) => (
                                              <div key={midx} className="space-y-1.5 border-l border-blue-900/30 pl-3">
                                                <div className="text-[9px] text-blue-400 font-bold uppercase">{mode.name}</div>
                                                <div className="grid grid-cols-2 gap-2">
                                                  {mode.stats.power && <div className="text-[9px] text-zinc-500 font-mono uppercase">Power: <span className="text-blue-400 font-black">{mode.stats.power}</span></div>}
                                                  {mode.stats.damage && <div className="text-[9px] text-zinc-500 font-mono uppercase">Damage: <span className="text-red-500 font-black">{mode.stats.damage}</span></div>}
                                                  {mode.stats.capacity && <div className="text-[9px] text-zinc-500 font-mono uppercase">Cap: <span className="text-amber-500 font-black">{mode.stats.capacity}</span></div>}
                                                  {mode.stats.rateOfFire && <div className="text-[9px] text-zinc-500 font-mono uppercase">RoF: <span className="text-amber-500 font-black">{mode.stats.rateOfFire}</span></div>}
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        ) : null}
                                       <div className="mt-auto space-y-1.5">
                                          {(() => {
                                            const daemonStats = getDaemonWeaponStats(item, character.corruptionValue || 0);
                                            if (daemonStats) {
                                              return (
                                                <>
                                                  <div className="text-[10px] text-zinc-500 font-mono uppercase">Power: <span className="text-blue-400 font-black">{daemonStats.power}</span></div>
                                                  <div className="text-[10px] text-zinc-500 font-mono uppercase">Damage: <span className="text-red-500 font-black">{daemonStats.damage}</span></div>
                                                </>
                                              );
                                            }
                                            return (
                                              <>
                                                {item.stats?.power && <div className="text-[10px] text-zinc-500 font-mono uppercase">Power: <span className="text-blue-400 font-black">{item.stats.power}</span></div>}
                                                {item.stats?.damage && <div className="text-[10px] text-zinc-500 font-mono uppercase">Damage: <span className="text-red-500 font-black">{item.stats.damage}</span></div>}
                                              </>
                                            );
                                          })()}
                                          {item.stats?.toughness && <div className="text-[10px] text-zinc-500 font-mono uppercase">Prot: <span className="text-green-500 font-black">{item.stats.toughness}</span></div>}
                                          {item.stats?.desc && item.description && <div className="text-[9px] text-zinc-600 font-mono italic leading-tight border-t border-zinc-900 pt-2">{item.stats.desc}</div>}
                                       </div>
                                     </div>

                                     <div className="mt-4 flex flex-wrap gap-2">
                                          {item.modes && item.modes.length > 0 ? (
                                            <div className="w-full flex gap-1 overflow-x-auto pb-1 no-scrollbar">
                                              {item.modes.map((mode, midx) => {
                                                const daemonStats = getDaemonWeaponStats(item, character.corruptionValue || 0);
                                                return (
                                                  <div key={midx} className="bg-zinc-900/30 border border-zinc-800/50 p-1 flex-shrink-0 min-w-[70px]">
                                                     <div className="text-[7px] text-zinc-600 uppercase font-black truncate">{mode.name.split(' ')[0]}</div>
                                                     <div className="flex justify-between items-center gap-1">
                                                        <div className="text-[9px] font-bold text-blue-500">{daemonStats ? daemonStats.power : (mode.stats.power || '-')}</div>
                                                        <div className="text-[9px] font-bold text-red-500">{daemonStats ? daemonStats.damage : (mode.stats.damage || '-')}</div>
                                                     </div>
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          ) : (
                                            <>
                                              {(() => {
                                                const daemonStats = getDaemonWeaponStats(item, character.corruptionValue || 0);
                                                if (daemonStats) {
                                                  return (
                                                    <>
                                                      <div className="bg-purple-900/40 p-1 border border-purple-800/50 text-center flex-1 min-w-[50px] animate-pulse">
                                                        <div className="text-[8px] text-purple-400 uppercase font-mono">D.Str</div>
                                                        <div className="text-[10px] font-black text-blue-400">{daemonStats.power}</div>
                                                      </div>
                                                      <div className="bg-purple-900/40 p-1 border border-purple-800/50 text-center flex-1 min-w-[50px] animate-pulse">
                                                        <div className="text-[8px] text-purple-400 uppercase font-mono">D.Dmg</div>
                                                        <div className="text-[10px] font-black text-red-400">{daemonStats.damage}</div>
                                                      </div>
                                                    </>
                                                  );
                                                }
                                                return null;
                                              })()}
                                              {!getDaemonWeaponStats(item, character.corruptionValue || 0) && item.stats?.power && (
                                                <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center flex-1 min-w-[50px]">
                                                  <div className="text-[8px] text-zinc-600 uppercase font-mono">Str</div>
                                                  <div className="text-[10px] font-black text-blue-500">{item.stats.power}</div>
                                                </div>
                                              )}
                                              {!getDaemonWeaponStats(item, character.corruptionValue || 0) && item.stats?.damage && (
                                                <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center flex-1 min-w-[50px]">
                                                  <div className="text-[8px] text-zinc-600 uppercase font-mono">Dmg</div>
                                                  <div className="text-[10px] font-black text-red-600">{item.stats.damage}</div>
                                                </div>
                                              )}
                                              {item.stats?.toughness && (
                                                <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center flex-1 min-w-[50px]">
                                                  <div className="text-[8px] text-zinc-600 uppercase font-mono">Tgh</div>
                                                  <div className="text-[10px] font-black text-green-600">
                                                    {item.stats.toughness.toString().startsWith('+') ? item.stats.toughness : \`+\${item.stats.toughness}\`}
                                                  </div>
                                                </div>
                                              )}
                                              {item.stats?.hp && (
                                                <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center flex-1 min-w-[50px]">
                                                  <div className="text-[8px] text-zinc-600 uppercase font-mono">AHP</div>
                                                  <div className="text-[10px] font-black text-emerald-500">{item.stats.hp}</div>
                                                </div>
                                              )}
                                              {item.stats?.capacity && item.stats.capacity !== '-' && (
                                                <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center flex-1 min-w-[50px]">
                                                  <div className="text-[8px] text-zinc-600 uppercase font-mono">Cap</div>
                                                  <div className="text-[10px] font-black text-amber-500">{item.stats.capacity}</div>
                                                </div>
                                              )}
                                              {item.stats?.rateOfFire && item.stats.rateOfFire !== '-' && (
                                                <div className="bg-zinc-900/50 p-1 border border-zinc-800 text-center flex-1 min-w-[50px]">
                                                  <div className="text-[8px] text-zinc-600 uppercase font-mono">RoF</div>
                                                  <div className="text-[10px] font-black text-amber-500">{item.stats.rateOfFire === '可' ? 'Auto' : 'Single'}</div>
                                                </div>
                                              )}
                                            </>
                                          )}
                                       </div>
                                  </div>
                                  
                                  {isEditing && (
                                    <div className="bg-zinc-900/30 px-4 py-2 flex justify-between items-center border-t border-zinc-900/50">
                                       <span className="text-[8px] font-mono text-zinc-700 tracking-widest uppercase">Verified</span>
                                       <div className="flex gap-2">
                                          <button type="button" onClick={(e) => { e.stopPropagation(); const newList = [...equipmentList]; newList[idx]!.count = Math.max(1, newList[idx]!.count - 1); setEquipmentList(newList); }} className="text-zinc-600 hover:text-white">-</button>
                                          <button type="button" onClick={(e) => { e.stopPropagation(); const newList = [...equipmentList]; newList[idx]!.count += 1; setEquipmentList(newList); }} className="text-zinc-600 hover:text-white">+</button>
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              const newList = [...equipmentList];
                                              newList[idx] = null;
                                              const compacted = newList.filter(Boolean);
                                              setEquipmentList([...compacted, ...new Array(12 - compacted.length).fill(null)]);
                                            }}
                                            className="text-zinc-800 hover:text-red-600 transition-colors ml-2"
                                          >
                                            <X size={14} />
                                          </button>
                                       </div>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <div className="flex-1 flex flex-col items-center justify-center p-4 border-dashed border-zinc-900 group-hover:border-blue-900/50 transition-colors">
                                   <Plus size={20} className="text-zinc-900 group-hover:text-blue-900 transition-colors mb-2" />
                                   <span className="text-[8px] font-mono text-zinc-800 uppercase tracking-widest">{isEditing ? 'Assign_Slot' : 'Locked'}</span>
                                </div>
                              )}
                            </div>
                          );`;

lines.splice(startLine - 1, endLine - startLine + 1, replacement);
fs.writeFileSync(filePath, lines.join('\n'));
console.log('Final line-based replacement applied.');
