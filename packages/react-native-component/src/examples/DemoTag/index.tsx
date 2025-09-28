/**
 * title: 综合用法
 * description: 把各种场景、API 都运用了
 */

import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Tst from '@/react-native-component/components';

const DemoTag: React.FC = () => {
  return (
    <ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Tst.Tag innerClassName='bg-[#098]' size='s'>
          入库
        </Tst.Tag>
        <Text>2022-07-05 11:16:24</Text>
      </View>

      <Tst.Cell.Group title='基础用法'>
        <Tst.Cell title='default 类型' value={<Tst.Tag>标签</Tst.Tag>} />
        <Tst.Cell
          title='primary 类型'
          value={<Tst.Tag type='primary'>标签</Tst.Tag>}
        />
        <Tst.Cell
          title='hazy 类型'
          value={<Tst.Tag type='hazy'>标签</Tst.Tag>}
        />
        <Tst.Cell
          title='ghost 类型'
          value={<Tst.Tag type='ghost'>标签</Tst.Tag>}
        />
        <Tst.Cell
          title='ghost 类型:细边框'
          value={
            <Tst.Tag type='ghost' hairline>
              标签
            </Tst.Tag>
          }
          divider={false}
        />
      </Tst.Cell.Group>
      <Tst.Cell.Group title='size'>
        <Tst.Cell
          title='大'
          value={
            <Tst.Space direction='horizontal'>
              <Tst.Tag size='l'>标签</Tst.Tag>
              <Tst.Tag size='l' closable>
                标签
              </Tst.Tag>
            </Tst.Space>
          }
        />
        <Tst.Cell
          title='中'
          value={
            <Tst.Space direction='horizontal'>
              <Tst.Tag size='m'>标签</Tst.Tag>
              <Tst.Tag size='m' closable>
                标签
              </Tst.Tag>
            </Tst.Space>
          }
        />
        <Tst.Cell
          title='小'
          value={
            <Tst.Space direction='horizontal'>
              <Tst.Tag size='s'>标签</Tst.Tag>
              <Tst.Tag size='s' closable>
                标签
              </Tst.Tag>
            </Tst.Space>
          }
          divider={false}
        />
      </Tst.Cell.Group>
      <Tst.Cell.Group title='操作相关'>
        <Tst.Cell
          title='closable'
          value={
            <Tst.Tag
              closable
              onClose={() => {
                console.log('点击了关闭');
              }}
            >
              标签
            </Tst.Tag>
          }
        />
        <Tst.Cell
          title='closeIcon'
          value={
            <Tst.Tag
              closable
              onClose={() => {
                console.log('点击了关闭');
              }}
              closeIcon={<Tst.PlayCircleFill />}
            >
              标签
            </Tst.Tag>
          }
        />
      </Tst.Cell.Group>
      <Tst.Cell.Group title='自定义颜色'>
        <Tst.Cell
          title='#FFA238'
          value={<Tst.Tag innerClassName='bg-[#FFA238]'>标签</Tst.Tag>}
        />
        <Tst.Cell
          title='#FA541C'
          value={<Tst.Tag innerClassName='bg-[#FA541C]'>标签</Tst.Tag>}
        />
        <Tst.Cell
          title='#34B545'
          value={<Tst.Tag innerClassName='bg-[#34B545]'>标签</Tst.Tag>}
        />
        <Tst.Cell
          title='#AD101A'
          value={<Tst.Tag innerClassName='bg-[#AD101A]'>标签</Tst.Tag>}
        />
        <Tst.Cell
          title='#1BA2FC'
          value={<Tst.Tag innerClassName='bg-[#1BA2FC]'>标签</Tst.Tag>}
        />
        <Tst.Cell
          title='#7D45E6'
          value={<Tst.Tag innerClassName='bg-[#7D45E6]'>标签</Tst.Tag>}
        />
        <Tst.Cell
          title='#0065FE'
          value={<Tst.Tag innerClassName='bg-[#0065FE]'>标签</Tst.Tag>}
        />
        <Tst.Cell
          title='#FFA238'
          value={
            <Tst.Tag innerClassName='bg-[#FFA238]' type='hazy'>
              标签
            </Tst.Tag>
          }
        />
        <Tst.Cell
          title='#FA541C'
          value={
            <Tst.Tag innerClassName='bg-[#FA541C]' type='hazy'>
              标签
            </Tst.Tag>
          }
        />
        <Tst.Cell
          title='#34B545'
          value={
            <Tst.Tag innerClassName='bg-[#34B545]' type='hazy'>
              标签
            </Tst.Tag>
          }
        />
        <Tst.Cell
          title='#AD101A'
          value={
            <Tst.Tag innerClassName='bg-[#AD101A]' type='hazy'>
              标签
            </Tst.Tag>
          }
        />
        <Tst.Cell
          title='#1BA2FC'
          value={
            <Tst.Tag innerClassName='bg-[#1BA2FC]' type='hazy'>
              标签
            </Tst.Tag>
          }
        />
        <Tst.Cell
          title='#7D45E6'
          value={
            <Tst.Tag innerClassName='bg-[#7D45E6]' type='hazy'>
              标签
            </Tst.Tag>
          }
        />
        <Tst.Cell
          title='#0065FE'
          value={
            <Tst.Tag innerClassName='bg-[#0065FE]' type='hazy'>
              标签
            </Tst.Tag>
          }
        />
      </Tst.Cell.Group>
    </ScrollView>
  );
};

export default DemoTag;
