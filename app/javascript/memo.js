function memo() {//memoと言う関数を定義
  const submit = document.getElementById("submit"); //index.htmlで指定したsubmitの情報を取得して変数submitに代入している
  submit.addEventListener("click", (e) => {  //変数submitがクリックされた時に実行される関数を定義している
    const formData = new FormData(document.getElementById("form"));//index.htmlで入力されたフォームの値を取得し、変数formDataに代入している
    const XHR = new XMLHttpRequest();//XMLHttpRequestは非同期通信を行えるようにするものでここでオブジェクトを生成してる
    XHR.open("POST","/posts",true);//クリックした時のアクションはcreateなのでそのルートと同じHTTPメソッド,パスで非同期通信はon
    XHR.responseType = "json";//返ってくるデータのフォーマットをjsonに指定
    XHR.send(formData);//４行目の変数formDateをリクエストとして送っている
    XHR.onload = () => {//レスポンスが返ってきた時に
      if (XHR.status != 200) {//送ったリクエストが正常じゃないなら（200意外の数字)
        alert(`Error ${XHR.status}: ${XHR.statusText}`);//エラーの後に送られてきたステータス（300とか400）:その送られてきたステータスのエラー文が英語表記でかかれる
        return null;//これ以降の処理を停止
      }//statusに関するコードの終わり
      const item = XHR.response.post;//変数itemにレスポンスとして返ってきたメモのレコードを代入
      const list = document.getElementById("list");//変数listにindex.htmlで指定した描画する場所を指定したid listを代入
      const formText = document.getElementById("content");//text_fieldに入力した内容をリセットするためにidを取得しformTextに代入
      //
      const HTML = `  
        <div class="post" data-id=${item.id}>  
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);//15行目で指定した描画場所の後に変数HTMLを書く
      formText.value = "";//text_fieldに記述した内容を空欄で上書きしてる
    };//レスポンスが返ってきた時の記述が終わり
    e.preventDefault();//3行目の内容がかぶらないようにしてる
  });//クリックした時に実行される処理のコードの終わり
}//memoの関数の定義の終わり
window.addEventListener("load", memo);//windowをリロードした時に実行する