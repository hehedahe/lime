"use strict"

const PATH = {
    field: {
        list: '/field/list'
    },
    city: {
        findRegion: '/city/findRegion',
        findCity: '/city/findCity',
    },
};

export async function fieldList() {
    try {
        const response = await axios(PATH.field.list);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function findRegion(regionId) {
    try {
        const response = await axios(`${PATH.city.findRegion}?regionId=${regionId}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}