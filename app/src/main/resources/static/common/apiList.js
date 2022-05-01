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
    member: {
        getLoginUser: '/member/getLoginUser',
        signout: '/member/signout'
    },
    courtRsv: {
        rsvsByDate: '/rsv/court/get',
        rsvsByUser: '/rsv/court/getList'
    },
    manager: {
        getMatchUsers: '/manager/getUsers',
        setTeam: '/manager/setTeam',
        findList: '/manager/findList',
        findMtch: '/manager/findMtch'
    }
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

// 테니스장 전체 리스트 가져오기
export async function fieldList() {
    try {
        const response = await axios(PATH.field.list);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

// 시도/시군구 중심좌표로 테니스장 리스트 가져오기
export async function courtList(lat, lng) {
    try {
        const response = await axios(`${PATH.field.courtList}?lat=${lat}&lng=${lng}`);
        // console.log("rtest:::::::::::::", response);
        // console.log("data::::::::::", response.data);
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

// 시도 중심좌표 찾기
export async function findRegion(regionId) {
    try {
        const response = await axios(`${PATH.city.findRegion}?regionId=${regionId}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

// 시군구 중심 좌표 찾기
export async function findCity(cityName, regionId) {
    try {
        const response = await axios(`${PATH.city.findCity}?cityName=${cityName}&regionId=${regionId}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};



// *********************
// member
// *********************

// 로그인한 유저 정보 가져오기
export async function getLoginUser() {
    try {
        const res = await axios(PATH.member.getLoginUser);
        return res.data;
    } catch (e) {
        console.log(e);
    }
}

// 로그아웃
export async function signout() {
    try {
        const res = await axios(PATH.member.signout);
        return res.data;
    } catch (e) {
        console.log(e);
    }
}



// *********************
// court reservation
// *********************

// 코트 예약 리스트 가져오기
export async function rsvsByDate(date, fieldId) {
    try {
        const response = await axios(`${PATH.courtRsv.rsvsByDate}?date=${date}&fieldId=${fieldId}`)
        return response.data;
    } catch (e) {
        console.log(e);
    }
};


// 유저의 예약 가져오기
export async function rsvsByUser() {
    try {
        const response = await axios(PATH.courtRsv.rsvsByUser);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}





// *********************
//        manager
// *********************

// 해당 매치 참가하는 유저 정보 가져오기
export async function getMatchUsers(matchId) {
    try {
        const response = await axios(`${PATH.manager.getMatchUsers}?matchId=${matchId}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// 매니저의 매치 리스트 가져오기
export async function getMtchList(managerId) {
    try {
        const response =await axios(`${PATH.manager.findList}?userId=${managerId}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// 매치 리스트 1개 가져오기
export async function getMtch(mtchId) {
    try {
        const response =await axios(`${PATH.manager.findMtch}?mtchId=${mtchId}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

