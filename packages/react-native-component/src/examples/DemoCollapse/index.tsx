/**
 * title: 综合用法
 * description: 把各种场景、API 都运用了
 */

import Tst from '@/react-native-component/index';
import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

const DemoCollapse: React.FC = () => {
  const [value, setValue] = useState(false);
  const [visible, setVisible] = useState(false);
  const [openKey, setOpenKey] = useState<number | undefined>();

  return (
    <ScrollView>
      <Tst.Button
        text='打开弹出'
        onPress={() => {
          setVisible(true);
        }}
      />

      <Tst.Popup visible={visible} position='bottom' safeAreaInsetBottom round>
        <Tst.Popup.Header
          title='测试'
          onClose={() => {
            setVisible(false);
          }}
        />
        {new Array(5).fill(0).map((_, index) => {
          return (
            <Tst.Collapse
              key={index}
              collapse={index === openKey}
              title={`${index} 项`}
              onCollapse={(collapse) => {
                setOpenKey(collapse ? index : undefined);
              }}
            >
              <View style={{ height: 300 }} />
            </Tst.Collapse>
          );
        })}
      </Tst.Popup>

      <Tst.Cell.Group title='单元格用法'>
        <Tst.Collapse
          title='标题11'
          onAnimationEnd={(v) => {
            console.log('动画结束:title 固定 => ', v);
          }}
        >
          <Text style={{ lineHeight: 20 }}>文案</Text>
          <View style={{ height: 20 }} />
          <Text style={{ lineHeight: 20 }}>文案</Text>
        </Tst.Collapse>

        <Tst.Collapse title='标题:没有 header 分割线' headerDivider={false}>
          <Text style={{ lineHeight: 20 }}>文案</Text>
          <View style={{ height: 20 }} />
          <Text style={{ lineHeight: 20 }}>文案</Text>
        </Tst.Collapse>

        <Tst.Collapse
          title='标题:没有 header 和 body 分割线'
          headerDivider={false}
          bodyDivider={false}
        >
          <Text style={{ lineHeight: 20 }}>文案</Text>
          <View style={{ height: 20 }} />
          <Text style={{ lineHeight: 20 }}>文案</Text>
        </Tst.Collapse>

        <Tst.Collapse
          title='标题12:body 无内边距'
          bodyPadding={false}
          defaultCollapse
        >
          <Text style={{ lineHeight: 20 }}>文案</Text>
          <View style={{ height: 20 }} />
          <Text style={{ lineHeight: 20 }}>文案</Text>
        </Tst.Collapse>

        <Tst.Collapse title='受控:展不开' bodyPadding={false} collapse={false}>
          <Text style={{ lineHeight: 20 }}>文案</Text>
          <View style={{ height: 20 }} />
          <Text style={{ lineHeight: 20 }}>文案</Text>
        </Tst.Collapse>

        <Tst.Collapse
          title='受控:正常'
          bodyPadding={false}
          collapse={value}
          onCollapse={setValue}
        >
          <Text style={{ lineHeight: 20 }}>文案</Text>
          <View style={{ height: 20 }} />
          {value ? <View style={{ height: 400 }} /> : null}
          <Text style={{ lineHeight: 20 }}>文案</Text>
        </Tst.Collapse>

        <Tst.Collapse
          title={
            <View>
              <Text style={{ marginRight: 8 }}>测试案例</Text>
              <Text>测试案例2</Text>
            </View>
          }
        >
          <Text style={{ lineHeight: 20 }}>文案</Text>
          <View style={{ height: 20 }} />
          <Text style={{ lineHeight: 20 }}>文案</Text>
        </Tst.Collapse>

        <Tst.Collapse
          title='title文案'
          renderTitle={useCallback((v: boolean) => {
            return (
              <Text>{`不要这样写 useCallback：${v ? '好的' : `\n不好`}`}</Text>
            );
          }, [])}
          renderTitleExtra={useCallback(
            (v: boolean, arrowJSX: React.ReactNode) => {
              return (
                <Tst.Space direction='horizontal' align='center'>
                  <Text>{v ? '点击收齐' : '点击展开'}</Text>
                  {arrowJSX}
                </Tst.Space>
              );
            },
            []
          )}
          renderBody={useCallback(() => {
            return (
              <>
                <Text style={{ lineHeight: 20 }}>文案：</Text>
                <View style={{ height: 400 }} />
                <Text style={{ lineHeight: 20 }}>文案</Text>
              </>
            );
          }, [])}
          onAnimationEnd={(v) => {
            console.log('动画结束:title 动态变化 => ', v);
          }}
        />

        <Tst.Collapse title='title文案'>
          <Text style={{ lineHeight: 20 }}>文案</Text>
          <View style={{ height: 20 }} />
          <Text style={{ lineHeight: 20 }}>文案</Text>
        </Tst.Collapse>

        <Tst.Collapse
          title='自定义标题颜色'
          titleClassName='bg-[#f5f5f5]'
          titleTextClassName='text-[#f30]'
          iconColor='#690'
        >
          <Text style={{ lineHeight: 20 }}>文案</Text>
          <View style={{ height: 20 }} />
          <Text style={{ lineHeight: 20 }}>文案</Text>
        </Tst.Collapse>

        <Tst.Collapse title='title文案' bodyClassName='bg-[#f5f5f5]'>
          <Text style={{ lineHeight: 20 }}>文案</Text>
          <View style={{ height: 20 }} />
          <Text style={{ lineHeight: 20 }}>文案</Text>
        </Tst.Collapse>
      </Tst.Cell.Group>

      <Tst.Cell.Group title='卡片用法'>
        <Tst.Space>
          <Tst.Collapse title='标题11' type='card'>
            <Text style={{ lineHeight: 20 }}>文案</Text>
            <View style={{ height: 20 }} />
            <Text style={{ lineHeight: 20 }}>文案</Text>
          </Tst.Collapse>

          <Tst.Collapse
            title='标题:没有 header 分割线'
            type='card'
            headerDivider={false}
          >
            <Text style={{ lineHeight: 20 }}>文案</Text>
            <View style={{ height: 20 }} />
            <Text style={{ lineHeight: 20 }}>文案</Text>
          </Tst.Collapse>

          <Tst.Collapse
            title='标题:没有 header 分割线 有 body 分割线'
            type='card'
            headerDivider={false}
            bodyDivider
          >
            <Text style={{ lineHeight: 20 }}>文案</Text>
            <View style={{ height: 20 }} />
            <Text style={{ lineHeight: 20 }}>文案</Text>
          </Tst.Collapse>

          <Tst.Collapse
            title='标题12:body 无内边距'
            type='card'
            defaultCollapse
            bodyPadding={false}
          >
            <Text style={{ lineHeight: 20 }}>文案</Text>
            <View style={{ height: 20 }} />
            <Text style={{ lineHeight: 20 }}>文案</Text>
          </Tst.Collapse>

          <Tst.Collapse
            title='受控:展不开'
            type='card'
            bodyPadding={false}
            collapse={false}
          >
            <Text style={{ lineHeight: 20 }}>文案</Text>
            <View style={{ height: 20 }} />
            <Text style={{ lineHeight: 20 }}>文案</Text>
          </Tst.Collapse>

          <Tst.Collapse
            title='受控:正常'
            type='card'
            bodyPadding={false}
            collapse={value}
            onCollapse={setValue}
          >
            <Text style={{ lineHeight: 20 }}>文案</Text>
            <View style={{ height: 20 }} />
            {value ? <View style={{ height: 400 }} /> : null}
            <Text style={{ lineHeight: 20 }}>文案</Text>
          </Tst.Collapse>

          <Tst.Collapse
            type='card'
            title={
              <View>
                <Text style={{ marginRight: 8 }}>测试案例</Text>
                <Text>测试案例2</Text>
              </View>
            }
          >
            <Text style={{ lineHeight: 20 }}>文案</Text>
            <View style={{ height: 20 }} />
            <Text style={{ lineHeight: 20 }}>文案</Text>
          </Tst.Collapse>

          <Tst.Collapse
            title='title文案'
            type='card'
            renderTitle={useCallback((v: boolean) => {
              return (
                <Text>{`不要这样写 useCallback：${v ? '好的' : `\n不好\n不好\n`}`}</Text>
              );
            }, [])}
            renderTitleExtra={useCallback(
              (v: boolean, arrowJSX: React.ReactNode) => {
                return (
                  <Tst.Space
                    direction='horizontal'
                    align='center'
                    justify='center'
                  >
                    <Text>{v ? '点击收齐' : '点击展开'}</Text>
                    {arrowJSX}
                  </Tst.Space>
                );
              },
              []
            )}
            renderBody={useCallback(() => {
              return (
                <>
                  <Text style={{ lineHeight: 20 }}>文案：</Text>
                  <View style={{ height: 400 }} />
                  <Text style={{ lineHeight: 20 }}>文案</Text>
                </>
              );
            }, [])}
            onAnimationEnd={(v) => {
              console.log('动画结束 => ', v);
            }}
          />

          <Tst.Collapse title='title文案' type='card'>
            <Text style={{ lineHeight: 20 }}>文案</Text>
            <View style={{ height: 20 }} />
            <Text style={{ lineHeight: 20 }}>文案</Text>
          </Tst.Collapse>

          <Tst.Collapse
            title='自定义标题颜色'
            type='card'
            titleClassName='bg-[#f5f5f5]'
            titleTextClassName='text-[#f30]'
            iconColor='#690'
          >
            <Text style={{ lineHeight: 20 }}>文案</Text>
            <View style={{ height: 20 }} />
            <Text style={{ lineHeight: 20 }}>文案</Text>
          </Tst.Collapse>

          <View
            style={{
              paddingHorizontal: 24,
              paddingVertical: 24,
            }}
          >
            <Tst.Collapse
              title='title文案'
              type='card'
              bodyClassName='bg-[#f5f5f5]'
              square={false}
            >
              <Text style={{ lineHeight: 20 }}>文案</Text>
              <View style={{ height: 20 }} />
              <Text style={{ lineHeight: 20 }}>文案</Text>
            </Tst.Collapse>
          </View>
        </Tst.Space>
      </Tst.Cell.Group>
    </ScrollView>
  );
};

export default DemoCollapse;
