## OAuth 2.0
> Client가 Server에서 사용자의 정보 및 권한을 안전하게 위임받고 API를 사용하기 위한 기술

* **accessToken**
  * OAuth를 통해 발급받는 특정 API만 사용허가 해주는 token
  * **refreshToken**
    * accessToken이 만료됐을 때, 갱신시키는 token

### Resource Server / Authorization Server
* *Client*에게 API를 제공
* *Client*에서 *Resource Owner*(User)에 의해 authorization이 발생했을 때, 해당 authorization이 유효한지 검증
  * * Authorized redirect URIs 비교
* 유효성 검증을 위해 Authorization Code를 *Resource Owner*전송
  * Web Browser redirection to authorization page
* Authorization Code + Client정보가 유효하면 **accessToken**을 **Client**에게 발급
* **accessToken**을 보고 *Client*에게 protected resource 제공

### Client
* register - *Resource Server* API 사용 등록
  * Client ID / Client Secret
  * Authorized redirect URIs - API를 사용할 주소
* 최소한의 기능(scope)만 인증받아 효율적으로 *Resource Server* 사용
* Authorization Code + Client정보를 *Resource Server*에게 전송
* **accessToken**을 보고 *Resource Owner*(User)에게 API 기능 제공