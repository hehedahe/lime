package com.lime.domain;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class City {
    int cityId;
    String cityName;
    float cityLat;
    float cityLng;
    Region region;
}
