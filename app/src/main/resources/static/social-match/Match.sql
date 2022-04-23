select
  m.mtch_id,
  m.court_id,
  m.user_id,
  m.mtch_type_id,
  m.mtch_date,
  m.st_time,
  m.end_time,
  m.fee,
  m.state,
  m.num_of_people,
  m.lv_id,
  c.name
from social_mtch m
  left outer join court c on m.court_id=c.court_id
order by
  m.st_time asc, m.court_id asc

select
  mtch_id,
  court_id,
  user_id,
  mtch_type_id,
  mtch_date,
  st_time,
  end_time,
  fee,
  state
from 
  social_mtch 
order by 
  st_time asc, court_id asc

select
  c.court_id,
  c.name,
  c.court_type_id,
  c.field_id,
  c.fee,
  f.field_id,
  f.name,
  f.addr
from court c
  left outer join field f on c.court_id=f.field_id

select
  m.mtch_id,
  m.court_id,
  m.user_id,
  m.mtch_type_id,
  m.mtch_date,
  m.st_time,
  m.end_time,
  m.fee,
  m.state,
  m.num_of_people,
  m.lv_id,
  c.court_id,
  c.name,
  c.court_type_id,
  c.field_id,
  f.field_id,
  f.name,
  f.addr
from social_mtch m
  left outer join court c on m.court_id=c.court_id
  left outer join field f on c.field_id=f.field_id
order by
  m.st_time asc, m.court_id asc

select
  m.mtch_id,
  m.court_id,
  m.user_id,
  m.mtch_type_id,
  m.mtch_date,
  m.st_time,
  m.end_time,
  m.fee,
  m.state,
  m.num_of_people,
  m.lv_id,
  c.court_id,
  c.name,
  c.court_type_id,
  c.field_id,
  f.field_id,
  f.name as fName,
  f.addr
from social_mtch m
  left outer join court c on m.court_id=c.court_id
  left outer join field f on c.field_id=f.field_id
where
  m.mtch_type_id = 1
order by
  m.st_time asc, f.name asc

select
  m.mtch_id,
  m.court_id,
  m.user_id,
  m.mtch_type_id,
  m.mtch_date,
  m.st_time,
  m.end_time,
  m.fee,
  m.state,
  m.num_of_people,
  m.lv_id,
  c.name,
  c.court_type_id,
  f.name as fName,
  f.addr,
  f.region_id,
  f.city_id
from social_mtch m
  left outer join court c on m.court_id=c.court_id
  left outer join field f on c.field_id=f.field_id
where
  f.region_id = 1
order by
  m.st_time asc, f.name asc

select
  m.mtch_id,
  m.court_id,
  m.user_id,
  m.mtch_type_id,
  m.mtch_date,
  m.st_time,
  m.end_time,
  m.fee,
  m.state,
  m.num_of_people,
  m.lv_id,
  c.name,
  c.court_type_id,
  f.name as fName,
  f.addr,
  f.region_id,
  f.city_id
from social_mtch m
  left outer join court c on m.court_id=c.court_id
  left outer join field f on c.field_id=f.field_id
where
  f.region_id=1 and f.city_id=22 and m.lv_id=1 and m.mtch_type_id=1 and c.court_type_id=1
order by
  m.st_time asc, f.name asc

select 
  smr.mtch_id,
  smr.user_id,
  smr.lime_id,
  smr.state,
  m.mtch_id,
  m.court_id,
  m.user_id,
  m.mtch_type_id,
  m.mtch_date,
  m.st_time,
  m.end_time,
  m.fee,
  m.state,
  m.num_of_people,
  m.lv_id,
  c.court_id,
  c.name,
  c.court_type_id,
  c.field_id,
  f.field_id,
  f.name as field_name,
  f.addr,
  f.region_id,
  f.city_id,
  city.city_name,
  lc.date
from social_mtch_rsv smr
  left outer join social_mtch m on smr.mtch_id=m.mtch_id
  left outer join court c on m.court_id=c.court_id
  left outer join field f on c.field_id=f.field_id
  left outer join city on f.city_id=city.city_id
  left outer join lime_cash lc on smr.lime_id=lc.lime_id
where
  smr.user_id=2
order by 
  m.mtch_id asc;