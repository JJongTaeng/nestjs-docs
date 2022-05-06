# NestJS with docs

## 목차

1. [Controller](#Controller)

# Controller
- 컨트롤러는 들어오는 요청을 처리하고 클라이언트에 응답을 반환하는 역할을 합니다.
- 컨트롤러의 목적은 애플리케이션에 대한 특정 요청을 수신하는 것입니다.
- routing 메커니즘으로 어떤 컨트롤러가 어떤 요청을 수신하는지 제어합니다.
- 컨트롤러는 다중 경로가 있고, 경로마다 다른 작업을 수행할 수 있습니다.
  - 예를 들어, /blog/post/1, /blog/writebox
- 클래스와, 데코레이터(어노테이션?)으로 컨트롤러를 만들 수 있습니다.

## Routing
- `@Controller` 데코레이터를 사용하여 기본 컨트롤러를 생성할 수 있습니다.
- 특정 경로를 넣어서 경로에 대한 요청을 수신할 수 있습니다.
  ```typescript
  @Controller('cats')
  export class CatsController {}
  ```
- 위 코드처럼 작성하면 http://localhost:3000/cats 로 수신할 수 있습니다.
- HTTP 메소드 데코레이터로 메소드를 구분하고, 데코레이터네 경로를 전달하여 경로를 지정할 수 있습니다.
  ```typescript
  @Controller('cats')
  export class CatsController {
    @Get()
    findAll(): string {
      return 'This action returns all cats';
    }
  }
  ```
- @Post(), @Put(), @Delete() 등 있습니다.
- 컨트롤러 경로와 중첩경로로 사용 가능합니다. `@Get('name')`으로 컨트롤러 내부에 선언하면, `/cats/name`으로 수신합니다.


## Request Object
- 요청 객체의 다양한 값을 활용하기 위해서 사용할 수 있습니다.
- express.js 에서 response 객체와 동일합니다.
  ```typescript
  @Controller('cats')
  export class CatsController {
    @Get()
    findAll(@Req() request: Request): string {
      return 'This is request object';
    }
  }    
  ```
- 하지만 요청 객체를 직접적으로 가져와서 사용하기 보단 제공된 데코레이터를 활용해서 Body, Query 등을 가져올 수 있습니다.

| 데코레이터                   | 변수명                             |
|-------------------------|---------------------------------|
| @Request(), @Req()      | req                             |
| @Response(), @Res()*    | res                             |
| @Next()                 | next                            |
| @Session()              | req.session                     |
| @Param(key?: string)    | req.params / req.params[key]    |
| @Body(key?: string)     | req.body / req.body[key]        |
| @Query(key?: string)    | req.query / req.query[key]      |
| @Headers(name?: string) | req.headers / req.headers[name] |
| @Ip()                   | req.ip                          |
| @HostParam()            | req.hosts                       |
- `@Res()`, `@Response()` 데코레이터를 사용하여 응답객체를 반환할 때는 꼭 res.json(), res.send() 와 같은 메서드를 호출하여 응답해야 한다. 안그러면 서버가 중단됩니다.

  
## Resource

## Route wildcards

## Status code

## Header

## Redirection

## Route parameters

## Sub-Domain Routing

## Scope

## Asynchronicity

## Request payloads



**[⬆ 상단으로](#목차)**
