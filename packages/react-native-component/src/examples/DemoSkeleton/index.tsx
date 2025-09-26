/**
 * title: 综合用法
 * description: 把各种场景、API 都运用了
 */

import React from 'react';
import { ScrollView } from 'react-native';
import Tst from '@/react-native-component/index';

const DemoSkeleton: React.FC = () => {
  return (
    <ScrollView>
      <Tst.Space tail head>
        <Tst.Card title='基础' square>
          <Tst.Skeleton loading />
        </Tst.Card>

        <Tst.Card title='基础:无动画' square>
          <Tst.Skeleton loading active={false} />
        </Tst.Card>

        <Tst.Card title='有头像' square>
          <Tst.Skeleton loading avatar />
        </Tst.Card>

        <Tst.Card title='有头像:无动画' square>
          <Tst.Skeleton loading avatar active={false} />
        </Tst.Card>

        <Tst.Card title='有头像:无标题' square>
          <Tst.Skeleton loading avatar title={false} />
        </Tst.Card>

        <Tst.Card title='自定义行数' square>
          <Tst.Skeleton
            loading
            avatar
            paragraph={{
              rows: 6,
              widths: [100, 100, 70, 100, 100, 20],
            }}
          />
        </Tst.Card>
      </Tst.Space>
    </ScrollView>
  );
};

export default DemoSkeleton;
