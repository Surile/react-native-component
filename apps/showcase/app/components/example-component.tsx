import { PreviewCarousel } from '@showcase/components/preview-carousel';
import * as React from 'react';
import { ButtonPreview } from '@/example-library/examples/button';

const exampleComponentPreviews = [{ name: 'Default', component: ButtonPreview }];

export default function ExampleComponentScreen() {
  return <PreviewCarousel previews={exampleComponentPreviews} />;
}
