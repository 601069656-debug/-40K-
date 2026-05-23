const desc = "该单位是导航者。获得「灵能天赋」和「警觉」技能，且可以通过额头的第三只眼来在亚空间为舰船导航";

const grantedSkills: {name: string, selectable: boolean}[] = [];

// Try to match "获得...技能" block
const grantBlockRegex = /获得([^。，\.]+?)技能/g;
let blockMatch;
while ((blockMatch = grantBlockRegex.exec(desc)) !== null) {
  const block = blockMatch[1];
  // extract all 「xxx」 or [xxx] from the block
  const skillRegex = /[「\[]([^」\]]+)[」\]]/g;
  let skillMatch;
  while ((skillMatch = skillRegex.exec(block)) !== null) {
     grantedSkills.push({
       name: skillMatch[1],
       selectable: block.includes('自选')
     });
  }
}

console.log(grantedSkills);
