// types
import { Contact } from './types';

// images
import avatar1 from '../../../../assets/images/users/user-10.jpg';
import avatar2 from '../../../../assets/images/users/user-9.jpg';
import avatar3 from '../../../../assets/images/users/user-8.jpg';
import avatar4 from '../../../../assets/images/users/user-7.jpg';
import avatar5 from '../../../../assets/images/users/user-6.jpg';
import avatar6 from '../../../../assets/images/users/user-5.jpg';

const contacts: Contact[] = [
    {
        id: 1,
        avatar: avatar1,
        shortDesc:
            'Dooley Inc is a partnership firm owned and operated by A and B in the city of Davis, California. You can find all types of lab equipment for schools and colleges.',
        companyName: 'Dooley Inc',
        name: 'Mary Smith',
        mobile: '(123) 123 1234',
        email: 'mary.smith@dooley.com',
        location: 'USA',
    },
    {
        id: 2,
        avatar: avatar2,
        shortDesc:
            'Kovacek LLC Company provides high quality plumbing services. We have been serving the Czech Republic and neighboring areas for more than 12 years.',
        companyName: 'Kovacek LLC',
        name: 'Julieta Sanchez',
        mobile: '(123) 123 1234',
        email: 'j.sanchez@kovacek.com',
        location: 'Czech Republic',
    },
    {
        id: 3,
        avatar: avatar3,
        shortDesc:
            'Roob & Cruickshank is a garage door repair company in the United Kingdom. We specialize in building and repairing garage doors.',
        companyName: 'Roob & Cruickshank',
        name: 'Ella Close',
        mobile: '(123) 123 1234',
        email: 'ella@roob.com',
        location: 'United Kingdom',
    },
    {
        id: 4,
        avatar: avatar4,
        shortDesc:
            'Bernhard-Nitzsche is a consultancy in the financial services industry.',
        companyName: 'Bernhard-Nitzsche',
        name: 'Jack Wu',
        mobile: '(123) 123 1234',
        email: 'j.wu@nitzsche.com',
        location: 'Singapore',
    },
    {
        id: 5,
        avatar: avatar5,
        shortDesc:
            'Brekke, Purdy, Crona is a partnership law firm.',
        companyName: 'Brekke, Purdy, Crona',
        name: 'Max Pietrek',
        mobile: '(123) 123 1234',
        email: 'mp@bpc.com',
        location: 'South Africa',
    },
    {
        id: 6,
        avatar: avatar6,
        shortDesc:
            'An Italian challenger bank.',
        companyName: 'Modern Bank',
        name: 'Giuseppe Totti',
        mobile: '(123) 123 1234',
        email: 'totti@mb.com',
        location: 'Italy',
    },
];

export { contacts };
