import { attachPropertiesToComponent } from '../../helpers';
import {
  buildHighlightLabelConfig,
  findAllChildrenValue,
  findAllParentNodeByValue,
  findNodeByValue,
  findParentNodeByValue,
  flattenDeepWidthChildren,
} from './helper';
import Tree from './tree';
import { TreeMultipleMode } from './var';

export default attachPropertiesToComponent(Tree, {
  MultipleMode: TreeMultipleMode,
  findNodeByValue,
  findAllChildrenValue,
  findParentNodeByValue,
  findAllParentNodeByValue,
  flattenDeepWidthChildren,
  buildHighlightLabelConfig,
});
