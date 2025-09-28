import { attachPropertiesToComponent } from '../../helpers'
import { Instance, Component, NotifyComponent } from './notify-instance'

export default attachPropertiesToComponent(Instance, {
  Component,
  NotifyComponent,
})
