"use strict"

const PATH = {
    field: {
        list: '/field/list',
        courtList: '/field/courtList',
        getCourt: '/field/get'
    },
    city: {
        findRegion: '/city/findRegion',
        findCity: '/city/findCity',
    },
};

// *********************
// dateFormat
// *********************
export async function dateFormat(colon, date) {
    let oldDate = new Date(await date);

    let year = oldDate.getFullYear().toString();
    let month;
    if (oldDate.getMonth() + 1 < 10) {
        month = '0' + (oldDate.getMonth() + 1).toString();
    }
    let day;
    if (oldDate.getDate() < 10) {
        day = '0' + oldDate.getDate().toString();
    }
    let time = oldDate.getTime();

    let formatDate = year + colon + month + colon + day;

    return formatDate;
}

// *********************
// field
// *********************

// 테니스장 전체 리스트
export async function fieldList() {
    try {
        const response = await axios(PATH.field.list);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

// 테니스장 리스트 by 좌표
export async function courtList(lat, lng) {
    try {
        const response = await axios(`${PATH.field.courtList}?lat=${lat}&lng=${lng}`);
        console.log("r:::::::::::::", response);
        console.log("data::::::::::", response.data);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

// 테니스장 한 개 가져오기
export async function getCourt(fieldId) {
    try {
        const response = await axios(`${PATH.field.getCourt}?fieldId=${fieldId}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}




// *********************
// city
// *********************

// 시도 좌표
export async function findRegion(regionId) {
    try {
        const response = await axios(`${PATH.city.findRegion}?regionId=${regionId}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

// 시군구 좌표
export async function findCity(cityName, regionId) {
    try {
        const response = await axios(`${PATH.city.findCity}?cityName=${cityName}&regionId=${regionId}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

