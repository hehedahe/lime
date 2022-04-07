package com.lime.domain;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class Region {
    int regionId;
    String regionName;
    float regionLat;
    float regionLng;
}
