"use strict"

// =====================================
//    코트 타입 / 실내외 / 주차여부 체크
// =====================================

// 코트타입 체크
export function checkCourtType(courtTypeId) {
    switch (courtTypeId) {
        case 1:
            return '하드 코트'
        case 2:
            return '클레이 코트'
        case 3:
            return '잔디 코트'
        case 4:
            return '앙투카 코트'
    }
};

// 실내/외 체크
export function checkIndoor(indYn) {
    if (indYn) {
        return '실내';
    } else {
        return '야외'
    }
};

// 주차 가능 여부 체크
export function checkParking(parkingArea) {
    if (parkingArea) {
        return '주차 가능';
    } else {
        return '주차장 없음'
    }
};

export function checkLight(lightYn) {
    if (lightYn) {
        return '라이트 보유'
    } else {
        return '라이트 미보유'
    }
};