import { trigger, style, useAnimation, transition, animate, animation } from "@angular/animations";


 const fadeIn = animation([
  style({ opacity: 0 }), // start state
  animate('{{time}}', style({ opacity: 1 }))
]);

 const fadeOut = animation([
  animate('{{time}}', style({ opacity: 0 }))
]);

export const RoateImageTrigger = trigger("roateImage", [
  transition("void => *", [useAnimation(fadeIn, {params: { time: '1000ms' }}  )]),
  transition("* => void", [useAnimation(fadeOut, {params: { time: '1000ms' }})]),
 ])

