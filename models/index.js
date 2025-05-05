import Users from './Users.js';
import Events from './Events.js';
import UserEvents from './UserEvents.js';


Users.associate({Events, UserEvents});
Events.associate({Users, UserEvents});


export {Users, Events, UserEvents};
