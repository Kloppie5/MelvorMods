export function setup ( context ) {
  context.settings.section('XP').add({
    name: 'xp_mul',
    label: 'XP Multiplier',
    hint: 'Multiply all XP gains by this amount',
    type: 'number',
    default: 1
  });
  console.log('XPMuliplier| Added XP Multiplier setting');

  context.patch(Skill, 'addXP').before((amount, masterAction) => {
    return [context.settings.section('XP').get('xp_mul') * amount, masterAction];
  });
}
