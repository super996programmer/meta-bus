import { Meta, Story } from '@storybook/react';
import BusKeyBoard, { IBusKeyBoard } from '@src/components/BusKeyBoard';

export default {
    title: 'Components/BusKeyBoard',
    component: BusKeyBoard,
    decorators: [
        (Story) => (
            <div style={{ margin: '3em' }}>
                {Story()}
            </div>
        ),
    ],
} as Meta;

const Template: Story<IBusKeyBoard> = (args) => (
    <BusKeyBoard {...args}>
        Hello
    </BusKeyBoard>
);

export const Hello = Template.bind({});
Hello.args = { name: 'LALA' };

export const Hello2 = Template.bind({});
Hello2.args = { name: 'DingDing' };

