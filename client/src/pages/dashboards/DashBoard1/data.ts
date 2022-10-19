// types
import { Message, ProjectDetail } from './types';

// images
import avatar1 from '../../../assets/images/users/user-1.jpg';
import avatar2 from '../../../assets/images/users/user-2.jpg';
import avatar3 from '../../../assets/images/users/user-3.jpg';
import avatar4 from '../../../assets/images/users/user-4.jpg';
import avatar5 from '../../../assets/images/users/user-5.jpg';

const messages: Message[] = [
    {
        id: 1,
        avatar: avatar1,
        sender: 'James Hill',
        text: "Hey! there I'm available...",
        time: '13:40 PM',
    },
    {
        id: 2,
        avatar: avatar2,
        sender: 'Angelina Cortez',
        text: "Commercial Proposal: Bernhard LLC",
        time: '13:34 PM',
    },
    {
        id: 3,
        avatar: avatar3,
        sender: 'David LeClerc',
        text: 'POV: Sisense & Flatley',
        time: '13:17 PM',
    },
    {
        id: 4,
        avatar: avatar4,
        sender: 'Cheng Yang',
        text: 'Gartner Conference',
        time: '12:20 PM',
    },
    {
        id: 5,
        avatar: avatar5,
        sender: 'Rajeed Alaba',
        text: "Lindgren: Sisense Demo",
        time: '10:15 PM',
    },
];
let today = new Date().toISOString().slice(0, 10)

const projectDetails: ProjectDetail[] = [
    {
        id: 1,
        name: 'Bernhard LLC',
        startDate: today,
        dueDate: today,
        status: 'Released',
        variant: 'danger',
        clients: 'Tyrone Nevin',
    },
    {
        id: 2,
        name: 'Kuhn and Sons',
        startDate: '01/01/2017',
        dueDate: '26/04/2017',
        status: 'Released',
        variant: 'success',
        clients: 'Jasmin Begum',
    },
    {
        id: 3,
        name: 'Flatley Inc',
        startDate: '01/05/2017',
        dueDate: '10/05/2017',
        status: 'Pending',
        variant: 'pink',
        clients: 'Cristina Sanchez',
    },
    {
        id: 4,
        name: 'Lindgren Ltd',
        startDate: '01/01/2017',
        dueDate: '31/05/2017',
        status: 'Work in Progress',
        variant: 'purple',
        clients: 'Lily Peacock',
    },
    {
        id: 5,
        name: 'Zemlak Inc',
        startDate: '01/01/2017',
        dueDate: '31/05/2017',
        status: 'Coming soon',
        variant: 'warning',
        clients: 'Lily Peacock',
    },
];

export { messages, projectDetails };
