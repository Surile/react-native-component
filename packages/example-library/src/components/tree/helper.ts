import { TreeOption, TreeSearchListData, TreeValue } from './interface';

export const findNodeByValue = (tree: TreeOption[], value: TreeValue): TreeOption | undefined => {
  for (const item of tree) {
    if (item.value === value) {
      return item;
    }

    if (item.children) {
      const _v = findNodeByValue(item.children, value);

      if (_v) {
        return _v;
      }
    }
  }

  return undefined;
};

export const findAllChildrenValue = (tree: TreeOption[]) => {
  const values: TreeValue[] = [];

  tree.forEach((item) => {
    values.push(item.value);

    if (item.children?.length) {
      values.push(...findAllChildrenValue(item.children));
    }
  });

  return values;
};

export const findParentNodeByValue = (tree: TreeOption[], value: TreeValue): TreeOption | null => {
  for (const item of tree) {
    if (item.children?.length) {
      if (item.children.filter((i) => i.value === value).length) {
        return item;
      } else {
        const _v = findParentNodeByValue(item.children, value);

        if (_v) {
          return _v;
        }
      }
    }
  }

  return null;
};

export const findAllParentNodeByValue = (tree: TreeOption[], value: TreeValue) => {
  const nodes: TreeOption[] = [];
  const doFind = (v: TreeValue) => {
    const p = findParentNodeByValue(tree, v);

    if (p) {
      nodes.push(p);
      doFind(p.value);
    }
  };

  doFind(value);

  return nodes;
};

export const flattenDeepWidthChildren = (tree: TreeOption[]) => {
  const nodes: TreeOption[] = [];

  tree.forEach((item) => {
    nodes.push(item);

    if (item.children?.length) {
      nodes.push(...flattenDeepWidthChildren(item.children));
    }
  });

  return nodes;
};

export const buildHighlightLabelConfig = (label: string, keyword: string): TreeSearchListData['labels'] => {
  if (!keyword) {
    return [];
  }

  const _reg = new RegExp(keyword, 'gi');
  const results = [...label.matchAll(_reg)];

  if (results.length) {
    const nodes: TreeSearchListData['labels'] = [];

    let pointer = 0;

    results.forEach((res) => {
      if (res.index !== pointer) {
        nodes.push({
          highlight: false,
          text: label.slice(pointer, res.index),
        });
      }

      pointer = (res.index || 0) + res[0].length;

      nodes.push({
        highlight: true,
        text: label.slice(res.index, pointer),
      });
    });

    if (pointer <= label.length - 1) {
      nodes.push({
        highlight: false,
        text: label.slice(pointer, label.length),
      });
    }

    return nodes;
  }

  return [];
};
