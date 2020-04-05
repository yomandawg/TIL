# Operating Systems


* **Mutex**
* **Semaphore**


* **non-blocking algorithm**
  * 쓰레드에 오류가 발생해도 다른 쓰레드에 영향을 끼치지 않게 하는 것
  * 공유 자원을 사용할 때, *mutex*나 *semaphore*을 사용해 동시 접근하지 못하게 하는 것
* **non-blocking I/O** (asynchronous I/O)
  * 입출력 처리가 완료되지 않은 상태에서 다른 처리를 진행하고, 입출력 처리가 완료됐을 때 확인하는 방법 (*callback*)


* **Concurrency**
  * 프로그램 조각들이 실행 순서와 무관하게 동작하는 방법
  * 동시에 여러 개의 작업을 처리하는 구조 - multithread, multiprocess
  * 하나의 작업자가 여러 개의 작업을 번갈아가며 수행 - 자원 활용의 효율화
* **Parallelism**
  * 물리적으로 다른 환경에서 여러개의 작업을 동시에 실행
  * 서로 의존관계가 없는 여러 프로세스들을 처리 - multiple CPU's
  * 자원 자체를 늘려서 처리량을 늘림