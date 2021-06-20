
import vaccine from './vaccine/getVaccine';
import getCase from './case/getCase';

const repositories = {
    vaccine: vaccine,
    getCase:getCase
};

export const Api = {
    get: name => repositories[name]
};




