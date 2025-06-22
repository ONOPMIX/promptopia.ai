import { createPrompt } from '../lib/repositories/prompts';

async function main() {
  await createPrompt({
    title: 'Sample Prompt',
    description: 'Example description',
    model: 'DALL-E',
    prompt: 'an astronaut riding a horse',
    previewUrl: 'https://example.com/preview.jpg',
    tags: ['sample'],
    price: 0,
    license: 'personal_use'
  });
  console.log('Seeded');
}

main();
