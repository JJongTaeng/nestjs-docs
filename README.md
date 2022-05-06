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

### Routing
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


### Request Object
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

  
### Resource
- Nest는 @Get(), @Post(), @Put(), @Delete(), @Patch(), @Options() 및 @Head()와 같은 모든 표준 HTTP 메서드에 대한 데코레이터를 제공합니다.
- 또한 @All()은 모든 것을 처리하는 끝점을 정의합니다.


### Route wildcards
- 패턴 기반 경로도 지원됩니다. 예를 들어 별표는 와일드카드로 사용되며 모든 문자 조합과 일치합니다.
```typescript
@Get('ab*cd')
findAll() {
  return 'This route uses a wildcard';
}
```


### Status code
- 응답 상태 코드는 기본적으로 항상 200 입니다. 201이 기본인 POST 요청을 제외하고!
- 핸들러 수준에서 @HttpCode(...) 데코레이터를 추가하여 이 동작을 쉽게 변경할 수 있습니다.
```typescript
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```
- 상태코드는 동적으로 다양하게 달라질 수 있습니다.(같은 엔드포인트 내에서도) 이 경우 @Res 데코레이터를 사용하여 객체를 사용합니다.


### Header
- 사용자 정의 응답 헤더를 지정하려면 @Header() 데코레이터 또는 라이브러리별 응답 객체를 사용하고 res.header()를 직접 호출할 수 있습니다.
```typescript
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```


### Redirection
- 응답을 특정 URL로 리디렉션하려면 @Redirect() 데코레이터 또는 라이브러리별 응답 객체를 사용하고 res.redirect()를 직접 호출할 수 있습니다.
```typescript
@Get()
@Redirect('https://nestjs.com', 301)
```
- 리다이렉션 URL을 동적으로 설정해야할 때가 있습니다. 그럴때는 라우터에서 특정 오브젝트 형태를 반환하여 설정합니다.
- 예를들어 아래 코드에서 url, statusCode를 프로퍼티로 갖는 객체를 라우터에서 반환하면 리다이렉션 URL, StatusCode를 수정할 수 있습니다.
```typescript
{
  "url": string,
  "statusCode": number
}

@Get('docs')
@Redirect('https://docs.nestjs.com', 302)
getDocs(@Query('version') version) {
  if (version && version === '5') {
    return { url: 'https://docs.nestjs.com/v5/' };
  }
}
```


### Route parameters
- 라우트 경로를 파라미터 데이터로 사용하기 위해서는 경로에 `:id`처럼 붙이고, @Param 데코레이터를 사용합니다.
```typescript
@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
```
- 특정 매개변수 키를 데코레이터에 전달한 다음 메서드 본문에서 이름으로 매개변수를 참조할 수도 있습니다. ex) @Param('id') id


### Sub-Domain Routing
- @Controller 데코레이터는 들어오는 요청의 HTTP 호스트가 특정 값과 일치하도록 요구하는 호스트 옵션을 사용할 수 있습니다.
```typescript
@Controller({ host: 'admin.example.com' })
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}
```
- Fastify 기반 으로 프레임워크를 사용하면 Sub-Domain Routing 사용이 안됩니다


### Scope
- Nest는 싱글톤 패턴이 기본적으로 적용됩니다.
- 다른 Scope로 제어하고 싶으면 설정이 가능합니다. 해당내용은 아래 Injection scopes 내용에 설명됩니다.


### Asynchronicity
- 모든 비동기 함수는 약속을 반환해야 합니다. 즉, Nest가 자체적으로 해결할 수 있는 지연된 값을 반환할 수 있습니다.```
```typescript
@Get()
async findAll(): Promise<any[]> {
  return [];
} 
```
- Nest는 자동으로 아래 소스를 구독하고 마지막으로 방출된 값을 취합니다(스트림이 완료되면).
```typescript
@Get()
findAll(): Observable<any[]> {
  return of([]);
}
```



### Request payloads
- POST 경로 핸들러의 이전 예에서는 클라이언트 매개변수를 허용하지 않았습니다. 여기에 @Body() 데코레이터를 추가하여 이 문제를 해결해 보겠습니다.
- 그러나 먼저(TypeScript를 사용하는 경우) DTO(Data Transfer Object) 스키마를 결정해야 합니다.
- TypeScript 인터페이스를 사용하거나 간단한 클래스를 사용하여 DTO 스키마를 결정할 수 있습니다. 흥미롭게도 여기에서 클래스를 사용하는 것이 좋습니다.
- 클래스는 JavaScript ES6 표준의 일부이므로 컴파일된 JavaScript에서 실제 엔터티로 보존됩니다.
- 반면에 TypeScript 인터페이스는 변환 중에 제거되기 때문에 Nest는 런타임에 이를 참조할 수 없습니다.
- 이것은 파이프와 같은 기능이 런타임에 변수의 메타 유형에 액세스할 때 추가 가능성을 가능하게 하기 때문에 중요합니다.
```typescript
// create-cat.dto.ts
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
```
```typescript
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
```

### 모듈과의 연결
- 컨트롤러가 완전히 정의된 상태에서 Nest는 여전히 CatsController가 존재한다는 사실을 알지 못하며 결과적으로 이 클래스의 인스턴스를 생성하지 않습니다
- 컨트롤러는 항상 모듈에 속하므로 @Module() 데코레이터 내에 컨트롤러 배열을 포함합니다. 루트 AppModule을 제외한 다른 모듈을 아직 정의하지 않았으므로 이를 사용하여 CatsController를 명시해줍니다.
- @Module() 데코레이터를 사용하여 모듈 클래스에 메타데이터를 첨부했으며 이제 Nest는 마운트해야 하는 컨트롤러를 쉽게 반영할 수 있습니다.
```typescript
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';

@Module({
  controllers: [CatsController],
})
export class AppModule {}
```


**[⬆ 상단으로](#목차)**


