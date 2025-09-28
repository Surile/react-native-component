
import { attachPropertiesToComponent } from '../../helpers'
import Skeleton from './skeleton'
import SkeletonAvatar from './skeleton-avatar'
import SkeletonParagraph from './skeleton-paragraph'

export default attachPropertiesToComponent(Skeleton, {
  Avatar: SkeletonAvatar,
  Paragraph: SkeletonParagraph,
})
