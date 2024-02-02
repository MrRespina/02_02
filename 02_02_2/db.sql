-- << vs Oracle 문법 비교 >>

-- 공백치환 함수 (NVL -> IFNULL)
-- 현재 시간/날짜 (SYSDATE -> NOW() )
-- 날짜 포맷
-- Oracle : TO-CHAR(sysdate, 'MMDDYYYYHH24MISS')
-- MYSQL : DATE_FORMAT(now(), '%Y%M%d%H%i%s')
--		   대문자 Y는 4자리 연도, 소문자 y는 2자리 연도
-- 날짜 포맷(요일)
--	Oracle : 요일을 1 ~ 7로 인식함 -> TO_CHAR(SYSDATE - 1, 'D')
--	MYSQL : 요일을 0 ~ 6로 인식함
--		-> DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 DAY), '%w')
-- [보통 JS에서 일~토를 를 0 ~ 6로 쓰기 때문에
--		Oracle인 경우 결과값을 -1 해서 반환하는 경우가 잦습니다]

-- Like 절 '%' 사용법
--	Oracle : Like '%'||'문자'||'%' 문자 앞뒤로 '%'
--	MYSQL : Like CONCAT('문자', '%') / CONCAT 함수 사용

-- 형 변환
--	Oracle : TO_CHAR, TO_NUMBER, TO_DATE 등...
--	MYSQL : CAST
--		SELECT TO_CHAR(1234) FROM DUAL; (Oracle)
--		SELECT CAST(1234 AS CHAR) FROM DUAL; (MYSQL)

-- ROWNUM
--	Oracle : where 절에 rownum >= 5 and rownum <= 10
--	MYSQL : where절 없이 limit 5, 10

-- SEQUENCE(시퀀스)
--	Oracle : 시퀀스명.nextval
-- 	MYSQL : table 생성 시 제약 조건에 auto increment를 추가하기 때문에
--			해당 컬럼을 SELECT하면 됨

-- 문자열 자르기
--	Oracle : SUBSTR(문자열, 1, 10)
--	MYSQL : SUBSTRING(문자열, 1, 10), LEFT(문자열, 3) RIGHT(문자열, 3)

-- 문자열 합치기 ( - 문자열을 연결한다고 가장 )
--	Oracle : 문자열(or 컬럼) || ' - '
--	MYSQL : CONCAT(문자열(or 컬럼), ' - ')
-- =====================================================================
-- create schema [데이터베이스명] 으로 데이터베이스 생성
-- 한글, 이모티콘을 사용하기 위해 설정까지 해줄 것
create schema `prac` default character set utf8mb4 default collate utf8mb4_general_ci;
DROP DATABASE prac;

use prac;


-- 유저 테이블 생성
--		  database/table

create table prac.users(
	id int not null auto_increment, -- 고유 식별자
    name varchar(20) not null, -- 이름
    age int unsigned not null, -- 나이 
    married tinyint not null, -- 결혼 여부
    comment text,			  -- 자기소개
    create_at datetime not null default now(), -- 데이터 생성날짜
    primary key(id),			-- PK
    unique index name_unique (name ASC)) -- 고유값 설정
    comment = '사용자 정보', -- 이 테이블에 대한 보충설명 (테이블 안에 있는 comment와 다름!)
    engine = InnoDB; -- 데이터베이스 엔진인데 대표적으로 MyISAM, InnoDB
    
create table prac.comments(
	id int not null auto_increment,
    commenter int not null,
    comment varchar(100) not null,
    created_at datetime not null default now(),
    primary key(id),
    index commenter_idx(commenter ASC),
    foreign key(commenter) references prac.users(id) on delete cascade on update cascade)
    comment = '댓글',
    engine = InnoDB;

-- FK 사용, 데이터의 일치를 위해서
-- 사용자의 정보가 수정되거나, 삭제되면 그 정보랑 연결되어있는 댓글의 정보도 같이 수정됨!

-- 자료형
--	INT : 정수
--	DOUBLE : 실수
--	VARCHAR(용량) : 용량만큼의 문자열
--	TEXT : 긴 글을 저장할 때 사용 / 수백자 이내라면 VARCHAR, 그 이상이면 TEXT
--	TINYINT : -128 ~ 127까지 정수 / 1 또는 0만 저장한다면 Boolean의 역할을 할 수 있음.
--	DATETIME : 날짜와 시간에 대한 정보 / 날짜는 DATE / 시간은 TIME

-- 옵션
--	null / not null
--	auto_increment : 오라클의 sequence 역할
--	unsigned : ex) INT : 약 -21억 ~ 21억 이라면
--		INT unsigned : 약 0 ~ 42억정도.(음수절을 사용하지 않고,0부터 형태의 크기만큼 전부 양수로 치환) / 실수에는 적용 X
--	zerofill : 숫자의 자릿수가 고정되어 있을 때 사용가능
--		ex) INT(4)일 때 값이 1이면, 0001이 됨.
--	default : 기본 값 / 날짜에서 기본값으로 now()줌.
--	now()는 현재 시각
--	unique index : 해당 값이 고유해야 하는지에 대한 옵션

-- 데이터 넣기
INSERT INTO prac.users(name,age,married,comment) VALUES('검정',21,0,'자기소개1');
INSERT INTO prac.users(name,age,married,comment) VALUES('흰색',23,1,'자기소개2');

INSERT INTO prac.comments(commenter,comment) VALUES(1,'하이~');

SELECT * FROM users;
SELECT * FROM comments;

