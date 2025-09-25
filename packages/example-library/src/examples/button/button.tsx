import Button from '@/example-library/components/button';
import { Text, View } from 'react-native';

export function ButtonPreview() {
  return (
    <View className="flex gap-3">
      <Button>
        <Text>主要按钮</Text>
      </Button>
      <Button type="link">
        <Text>link按钮</Text>
      </Button>
      <Button type="hazy">
        <Text>hazy按钮</Text>
      </Button>
      <Button type="outline">
        <Text>outline按钮</Text>
      </Button>
      <Button type="ghost">
        <Text>ghost按钮</Text>
      </Button>
    </View>
  );
}
