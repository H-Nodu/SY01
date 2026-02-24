const QUESTIONS_V22_NEW = [
  {
    "num": 1,
    "original_num": 4,
    "question": "ある組織で、ネットワーク共有データの削除や不適切なアクセス権限に関する問題が発生しています。これらを追跡し、是正するのに役立つソリューションはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "DLP"
      },
      {
        "letter": "B",
        "text": "EDR"
      },
      {
        "letter": "C",
        "text": "FIM"
      },
      {
        "letter": "D",
        "text": "ACL"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 2,
    "original_num": 7,
    "question": "従業員が会社支給のタブレットで必要な機能が不足しており、生産性に影響が出ています。経営陣は48時間以内の解決を求めています。最適なソリューションはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "EDR"
      },
      {
        "letter": "B",
        "text": "COPE"
      },
      {
        "letter": "C",
        "text": "MDM"
      },
      {
        "letter": "D",
        "text": "FDE"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 3,
    "original_num": 16,
    "question": "セキュリティチームがクラウドセキュリティポスチャ管理のためのツールを購入しました。しかし、ツールが検出する設定ミスの数に圧倒されています。クラウドリソースのセキュリティに関するワークフローを確立するために、セキュリティチームが設定すべきものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "CASB"
      },
      {
        "letter": "B",
        "text": "IAM"
      },
      {
        "letter": "C",
        "text": "SOAR"
      },
      {
        "letter": "D",
        "text": "XDR"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 4,
    "original_num": 34,
    "question": "ある企業が、新しいWi-Fi対応の環境センサーを使用してメトリクスを自動収集したいと考えています。セキュリティチームが最も実施する可能性が高いのはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "センサーのソフトウェアをリスク登録簿に追加する。"
      },
      {
        "letter": "B",
        "text": "センサー用のVLANを作成する。"
      },
      {
        "letter": "C",
        "text": "センサーを物理的にエアギャップする。"
      },
      {
        "letter": "D",
        "text": "すべてのセンサーにTLS 1.2を設定する。"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 5,
    "original_num": 35,
    "question": "追加のメールサーバーを展開して数週間後、従業員からメッセージがスパムとしてマークされるという苦情が出ています。更新すべきものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "CNAME"
      },
      {
        "letter": "B",
        "text": "SMTP"
      },
      {
        "letter": "C",
        "text": "DLP"
      },
      {
        "letter": "D",
        "text": "SPF"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 6,
    "original_num": 39,
    "question": "ソフトウェア開発者が、アプリケーションの完全性を保証するアプリケーションセキュリティ技術を実装したいと考えています。これを達成する技術はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "セキュアCookie"
      },
      {
        "letter": "B",
        "text": "入力バリデーション"
      },
      {
        "letter": "C",
        "text": "静的解析"
      },
      {
        "letter": "D",
        "text": "コード署名"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 7,
    "original_num": 53,
    "question": "ある組織で、リモートワークによりVPNコンセントレータとインターネット回線のスケーリング問題が発生しています。VPNとインターネット回線のトラフィックを削減しつつ、データセンターへの暗号化トンネルアクセスとリモート従業員のインターネットトラフィックの監視を引き続き提供できるソフトウェアソリューションを探しています。これらの目的を達成するのに役立つものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "リモート従業員にSASEソリューションを展開する"
      },
      {
        "letter": "B",
        "text": "冗長インターネットを備えた負荷分散VPNソリューションを構築する"
      },
      {
        "letter": "C",
        "text": "VPNトラフィック用の低コストSD-WANソリューションを購入する"
      },
      {
        "letter": "D",
        "text": "クラウドプロバイダーを使用して追加のVPNコンセントレータを作成する"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 8,
    "original_num": 57,
    "question": "セキュリティアナリストがWebサーバーのログを確認し、以下のエントリを発見しました：16.22.48.102 -- 26/April/2023 22:00:04.33 GET \"http://www.databaseInfo.com/index.html/*\" 200 16.22.48.102 -- 26/April/2023 22:00:07.23 GET \"http://www.databaseInfo.com/index.html/../\" 404 16.22.48.102 -- 26/April/2023 22:01:16.03 GET \"http://www.databaseInfo.com/index.html/../images\" 404 16.22.48.102 -- 26/April/2023 22:03:10.25 GET \"http://www.databaseInfo.com/index.html/../passwords\" 404 16.22.48.102 -- 26/April/2023 22:05:11.22 GET \"http://www.databaseInfo.com/index.html/.. /storedSQLqueries\" 404 最も試みられている可能性が高い攻撃はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "サービス拒否攻撃"
      },
      {
        "letter": "B",
        "text": "パスワードスプレー攻撃"
      },
      {
        "letter": "C",
        "text": "SQLインジェクション"
      },
      {
        "letter": "D",
        "text": "ディレクトリトラバーサル"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 9,
    "original_num": 64,
    "question": "定期監査中に、アナリストがある部門で審査されていないソフトウェアが使用されていることを発見しました。これはどのような脅威ですか？",
    "choices": [
      {
        "letter": "A",
        "text": "スパイ活動"
      },
      {
        "letter": "B",
        "text": "データ流出"
      },
      {
        "letter": "C",
        "text": "シャドーIT"
      },
      {
        "letter": "D",
        "text": "ゼロデイ"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 10,
    "original_num": 69,
    "question": "ある顧客がCSPと契約を結んでおり、IaaSエンクレーブに実装すべきコントロールを特定したいと考えています。この情報が含まれている可能性が最も高いのはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "作業範囲記述書"
      },
      {
        "letter": "B",
        "text": "責任分担マトリクス"
      },
      {
        "letter": "C",
        "text": "サービスレベル契約"
      },
      {
        "letter": "D",
        "text": "基本サービス契約"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 11,
    "original_num": 86,
    "question": "あるアラートがゼロデイ脆弱性に関連する攻撃を示しています。アナリストがリスクを軽減するためにネットワークに踏み台サーバーを配置しました。実装されているコントロールの種類はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "補償的コントロール"
      },
      {
        "letter": "B",
        "text": "検知的コントロール"
      },
      {
        "letter": "C",
        "text": "運用的コントロール"
      },
      {
        "letter": "D",
        "text": "物理的コントロール"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 12,
    "original_num": 96,
    "question": "セキュリティレビューの後、組織はWPA2-Enterpriseを使用したワイヤレスアクセスにおいて、ユーザーが個別の資格情報を使用して企業のIDサービスに対して本人確認を行うことを確保する必要があります。この環境でRADIUSを正しく適用する設定手順はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "802.1X認証を有効にし、企業ディレクトリと統合する"
      },
      {
        "letter": "B",
        "text": "すべてのユーザーデバイスに自己署名証明書をインストールする"
      },
      {
        "letter": "C",
        "text": "すべてのワイヤレスクライアントに対してMACフィルタリングを有効にする"
      },
      {
        "letter": "D",
        "text": "ワイヤレスコントローラーを多要素認証を要求するように設定する"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 13,
    "original_num": 100,
    "question": "セキュリティアナリストが、小規模なセキュリティインシデントのコストを10,000ドルと見積もり、年に2回発生すると予測しています。アナリストは来年度の予算として20,000ドルを推奨しています。10,000ドルが表すものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "ARO"
      },
      {
        "letter": "B",
        "text": "SLE"
      },
      {
        "letter": "C",
        "text": "ALE"
      },
      {
        "letter": "D",
        "text": "RPO"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 14,
    "original_num": 102,
    "question": "エンタープライズ環境のセキュリティ確保において、定期的なパッチ適用がリスク軽減にどのように役立つかを説明しているのはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "ソフトウェアのバグを減らすことでサーバーのパフォーマンスを向上させる。"
      },
      {
        "letter": "B",
        "text": "既知のソフトウェア脆弱性が悪用される前に対処する。"
      },
      {
        "letter": "C",
        "text": "ファイアウォールや侵入検知の必要性をなくす。"
      },
      {
        "letter": "D",
        "text": "ウイルス対策ツールの必要性をなくす。"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 15,
    "original_num": 105,
    "question": "経理部門の従業員がWebサイトにログインしたところ、デスクトップアプリケーションが自動的にコンピュータにダウンロードされました。何が発生しましたか？",
    "choices": [
      {
        "letter": "A",
        "text": "XSS"
      },
      {
        "letter": "B",
        "text": "水飲み場攻撃"
      },
      {
        "letter": "C",
        "text": "タイポスクワッティング"
      },
      {
        "letter": "D",
        "text": "バッファオーバーフロー"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 16,
    "original_num": 109,
    "question": "ITチームが、管理者の電話にランダムに生成されたMFAトークンを送信する新しい管理アプリケーションを導入しました。この新しいMFA対策にもかかわらず、同じソフトウェアのセキュリティ侵害が発生しました。この種の攻撃を説明しているのはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "スミッシング"
      },
      {
        "letter": "B",
        "text": "タイポスクワッティング"
      },
      {
        "letter": "C",
        "text": "スパイ活動"
      },
      {
        "letter": "D",
        "text": "プリテキスティング"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 17,
    "original_num": 118,
    "question": "セキュリティアナリストが、サードパーティのクラウドサービスプロバイダーがホストする、企業の新しい顧客向け決済アプリケーションのネットワーク図の初稿を作成しています。",
    "choices": [],
    "answer": "S",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 18,
    "original_num": 120,
    "question": "セキュリティアナリストが、あるユーザーのVPNログインに関する不審なアクティビティアラートについて以下のログを確認しています。アラートをトリガーした悪意のあるアクティビティの指標はどれですか？ #ログ概要：ユーザーがイリノイ州シカゴから複数回ログインし、その後突然イタリアのローマからのログイン成功が表示され、再びシカゴからのログインが続く - すべて短時間の間に発生。",
    "choices": [
      {
        "letter": "A",
        "text": "あり得ない移動"
      },
      {
        "letter": "B",
        "text": "アカウントロックアウト"
      },
      {
        "letter": "C",
        "text": "ブロックされたコンテンツ"
      },
      {
        "letter": "D",
        "text": "同時セッション使用"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 19,
    "original_num": 121,
    "question": "システム管理者がエンタープライズ環境内のパスワードポリシーを変更しており、この更新をすべてのシステムにできるだけ早く実装したいと考えています。管理者が最も使用する可能性が高いオペレーティングシステムのセキュリティ対策はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "PowerShellスクリプトを展開する"
      },
      {
        "letter": "B",
        "text": "GPOの更新をプッシュする"
      },
      {
        "letter": "C",
        "text": "PAPを有効にする"
      },
      {
        "letter": "D",
        "text": "EDRプロファイルを更新する"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 20,
    "original_num": 124,
    "question": "セキュリティアナリストが、人事部門が導入を希望しているSaaSアプリケーションを評価しています。アナリストはSaaSベンダーにSOC 2レポートを要求しました。アナリストが最も実施している可能性が高いプロセスはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "内部監査"
      },
      {
        "letter": "B",
        "text": "ペネトレーションテスト"
      },
      {
        "letter": "C",
        "text": "アテステーション"
      },
      {
        "letter": "D",
        "text": "デューデリジェンス"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 21,
    "original_num": 127,
    "question": "効果的なセキュリティガバナンスを定義する上で最も重要な要素はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "外部要因の発見と文書化"
      },
      {
        "letter": "B",
        "text": "従業員のオンボーディングおよびオフボーディングの手順を策定する"
      },
      {
        "letter": "C",
        "text": "所有者、管理者、保管者の役割と責任を割り当てる"
      },
      {
        "letter": "D",
        "text": "変更管理手順を定義し監視する"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 22,
    "original_num": 132,
    "question": "ユーザーが不明なリポジトリからパッチをダウンロードしたところ、FIMアラートによりOSファイルのハッシュが変更されたことが示されました。最も発生した可能性が高い攻撃はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "ロジックボム"
      },
      {
        "letter": "B",
        "text": "キーロガー"
      },
      {
        "letter": "C",
        "text": "ランサムウェア"
      },
      {
        "letter": "D",
        "text": "ルートキット"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 23,
    "original_num": 137,
    "question": "最高情報セキュリティ責任者（CISO）が、ソフトウェア開発手法に関連する情報セキュリティポリシーを策定しました。CISOが組織の文書に含める可能性が最も高いのはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "ピアレビュー要件"
      },
      {
        "letter": "B",
        "text": "多要素認証"
      },
      {
        "letter": "C",
        "text": "ブランチ保護テスト"
      },
      {
        "letter": "D",
        "text": "シークレット管理の設定"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 24,
    "original_num": 150,
    "question": "ある企業が自社のシステムで機密データを処理・保存しています。プライバシー規制への準拠を確保するために、最初に取るべき手順はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "アクセス制御と暗号化を実装する。"
      },
      {
        "letter": "B",
        "text": "データ保護ポリシーに関するトレーニングを策定・提供する。"
      },
      {
        "letter": "C",
        "text": "インシデント対応計画と災害復旧計画を作成する。"
      },
      {
        "letter": "D",
        "text": "セキュリティソフトウェアを購入・インストールする。"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 25,
    "original_num": 152,
    "question": "ソフトウェア開発者が新しいアプリケーションをリリースし、開発者のWebサイトを通じてアプリケーションファイルを配布しています。ダウンロードしたファイルの完全性をユーザーが検証できるように、開発者がWebサイトに掲載すべきものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "ハッシュ値"
      },
      {
        "letter": "B",
        "text": "証明書"
      },
      {
        "letter": "C",
        "text": "アルゴリズム"
      },
      {
        "letter": "D",
        "text": "ソルト処理"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 26,
    "original_num": 158,
    "question": "レガシーシステムを本番サービスに使用する場合、最も重要なセキュリティ上の懸念はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "不安定性"
      },
      {
        "letter": "B",
        "text": "ベンダーサポートの欠如"
      },
      {
        "letter": "C",
        "text": "可用性の喪失"
      },
      {
        "letter": "D",
        "text": "安全でないプロトコルの使用"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 27,
    "original_num": 162,
    "question": "セキュリティアナリストがSIEMログを確認する最も可能性の高い理由はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "最近のパスワードリセット試行を確認するため"
      },
      {
        "letter": "B",
        "text": "潜在的なDDoS攻撃を監視するため"
      },
      {
        "letter": "C",
        "text": "プライバシー侵害の範囲を評価するため"
      },
      {
        "letter": "D",
        "text": "複数のホスト間の相関関係を確認するため"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 28,
    "original_num": 166,
    "question": "インシデント対応の専門家が、悪意のある攻撃が組織の他の部分に拡大するのを阻止しなければなりません。インシデント対応の専門家が最初に行うべきことはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "根絶"
      },
      {
        "letter": "B",
        "text": "復旧"
      },
      {
        "letter": "C",
        "text": "封じ込め"
      },
      {
        "letter": "D",
        "text": "シミュレーション"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 29,
    "original_num": 168,
    "question": "企業のさまざまなステークホルダーが、海外拠点に影響を及ぼすセキュリティ侵害が発生した場合の役割と責任について話し合うために会議を行いました。これは何の例ですか？",
    "choices": [
      {
        "letter": "A",
        "text": "机上演習"
      },
      {
        "letter": "B",
        "text": "ペネトレーションテスト"
      },
      {
        "letter": "C",
        "text": "地理的分散"
      },
      {
        "letter": "D",
        "text": "インシデント対応"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 30,
    "original_num": 170,
    "question": "高可用性が求められるミッションクリティカルな本番サーバーで発見されたゼロデイ脆弱性に対する最善の緩和策はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "仮想化してコンテナ化されたインスタンスに移行する"
      },
      {
        "letter": "B",
        "text": "削除して隔離されたネットワークにサンドボックス化する"
      },
      {
        "letter": "C",
        "text": "監視して補償的コントロールを実装する"
      },
      {
        "letter": "D",
        "text": "できるだけ早くパッチを適用して本番環境に再展開する"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 31,
    "original_num": 188,
    "question": "バグバウンティプログラムを開始する利点はどれですか？（2つ選択）",
    "choices": [
      {
        "letter": "A",
        "text": "第三者へのリスク移転"
      },
      {
        "letter": "B",
        "text": "ゼロデイ脆弱性の数の削減"
      },
      {
        "letter": "C",
        "text": "従業員のセキュリティ意識の向上"
      },
      {
        "letter": "D",
        "text": "プログラム管理コストの削減"
      },
      {
        "letter": "E",
        "text": "脆弱性のより迅速な発見"
      },
      {
        "letter": "F",
        "text": "パッチ管理プロセスの改善"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 32,
    "original_num": 203,
    "question": "最高情報セキュリティ責任者が、コンプライアンス目標を追跡するためにシステムと手順の頻繁かつ詳細なレビューを実施したいと考えています。この目標を達成するための最善の方法はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "第三者によるアテステーション"
      },
      {
        "letter": "B",
        "text": "ペネトレーションテスト"
      },
      {
        "letter": "C",
        "text": "内部監査"
      },
      {
        "letter": "D",
        "text": "脆弱性スキャン"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 33,
    "original_num": 209,
    "question": "組織がデータプライバシープログラムを確立・維持する際に評価すべき最も重要な考慮事項はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "データプライバシー責任者の報告体制"
      },
      {
        "letter": "B",
        "text": "データ主体のアクセス要求プロセス"
      },
      {
        "letter": "C",
        "text": "管理者またはプロセッサーとしての役割"
      },
      {
        "letter": "D",
        "text": "企業の物理的所在地"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 34,
    "original_num": 213,
    "question": "最高情報セキュリティ責任者（CISO）が、新しいサーバーにハードウェアレベルのメモリ暗号化を搭載することを要求しています。CISOが保護したいデータの状態はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "使用中のデータ"
      },
      {
        "letter": "B",
        "text": "保存データ"
      },
      {
        "letter": "C",
        "text": "転送中のデータ"
      },
      {
        "letter": "D",
        "text": "データ主権"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 35,
    "original_num": 223,
    "question": "ある企業がネットワーク構築時に認定ハードウェアの使用を義務付けられています。偽造ハードウェアの調達に関連するリスクに最も適切に対処するのはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "サプライチェーンの徹底的な分析"
      },
      {
        "letter": "B",
        "text": "法的拘束力のある企業調達ポリシー"
      },
      {
        "letter": "C",
        "text": "ベンダー契約およびSOWにおける監査権条項"
      },
      {
        "letter": "D",
        "text": "すべてのサプライヤーおよびベンダーに対する詳細なペネトレーションテスト"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 36,
    "original_num": 239,
    "question": "ある企業が、インフラストラクチャに関する詳細な情報をあまり提供せずに、社内のレッドチームのペネトレーションテストを支援するようベンダーに依頼しました。このシナリオが説明するペネトレーションテストの手法はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "パッシブ偵察"
      },
      {
        "letter": "B",
        "text": "部分的に既知の環境"
      },
      {
        "letter": "C",
        "text": "統合テスト"
      },
      {
        "letter": "D",
        "text": "防御テスト"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 37,
    "original_num": 240,
    "question": "ある組織が本社と支社間でVPNを利用しています。VPNが保護しているのはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "使用中のデータ"
      },
      {
        "letter": "B",
        "text": "転送中のデータ"
      },
      {
        "letter": "C",
        "text": "地理的制限"
      },
      {
        "letter": "D",
        "text": "データ主権"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 38,
    "original_num": 243,
    "question": "セキュリティオペレーションセンターが不審なIPアドレスに関するイベントを調査しています。セキュリティアナリストが以下のイベントログを確認したところ、同じIPアドレスから認証を試みた際に、かなりの数のユーザーアカウントでログイン失敗が発生していることを発見しました。最も発生した可能性が高い攻撃を説明しているのはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "スプレー攻撃"
      },
      {
        "letter": "B",
        "text": "ブルートフォース攻撃"
      },
      {
        "letter": "C",
        "text": "辞書攻撃"
      },
      {
        "letter": "D",
        "text": "レインボーテーブル攻撃"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 39,
    "original_num": 246,
    "question": "マーケティング部門が、適切な部門に知らせることなく、独自のプロジェクト管理ソフトウェアを導入しました。このシナリオを説明しているのはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "シャドーIT"
      },
      {
        "letter": "B",
        "text": "内部脅威"
      },
      {
        "letter": "C",
        "text": "データ流出"
      },
      {
        "letter": "D",
        "text": "サービス中断"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 40,
    "original_num": 252,
    "question": "管理チームが、手動で設定された新しいアカウントに正しいアクセス権やアクセス許可が常に付与されているわけではないことに気付きました。アカウント作成を効率化するためにシステム管理者が使用すべき自動化技術はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "ガードレールスクリプト"
      },
      {
        "letter": "B",
        "text": "チケットワークフロー"
      },
      {
        "letter": "C",
        "text": "エスカレーションスクリプト"
      },
      {
        "letter": "D",
        "text": "ユーザープロビジョニングスクリプト"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 41,
    "original_num": 268,
    "question": "ある企業は毎年、情報セキュリティプログラムに対するリスク評価を実施している。このリスク評価を最もよく表しているのは次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "定期的"
      },
      {
        "letter": "B",
        "text": "アドホック（随時）"
      },
      {
        "letter": "C",
        "text": "一回限り"
      },
      {
        "letter": "D",
        "text": "継続的"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 42,
    "original_num": 275,
    "question": "ある企業が、メトリクスを自動的に収集するために、新しいWi-Fi対応の環境センサーを使用したいと考えている。セキュリティチームが最も行う可能性が高いのは次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "センサーソフトウェアをリスク登録簿に追加する。"
      },
      {
        "letter": "B",
        "text": "センサー用のVLANを作成する。"
      },
      {
        "letter": "C",
        "text": "センサーを物理的にエアギャップする。"
      },
      {
        "letter": "D",
        "text": "すべてのセンサーにTLS 1.2を設定する。"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 43,
    "original_num": 276,
    "question": "オンボーディングプロセス中に、従業員はイントラネットアカウント用のパスワードを作成する必要がある。パスワードには10文字、数字、英字、および2つの特殊文字を含める必要がある。パスワードが作成されると、企業はイントラネットプロファイルに基づいて、従業員に他の社内Webサイトへのアクセスを許可する。イントラネットアカウントを保護し、ユーザーのイントラネットアカウントに基づいて複数のサイトへのアクセスを許可するために、企業が最も使用している可能性が高いアクセス管理の概念は次のうちどれか。（2つ選択）",
    "choices": [
      {
        "letter": "A",
        "text": "フェデレーション"
      },
      {
        "letter": "B",
        "text": "本人確認"
      },
      {
        "letter": "C",
        "text": "パスワードの複雑性"
      },
      {
        "letter": "D",
        "text": "デフォルトパスワードの変更"
      },
      {
        "letter": "E",
        "text": "パスワードマネージャー"
      },
      {
        "letter": "F",
        "text": "オープン認証"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 44,
    "original_num": 278,
    "question": "オンプレミスのアクセスを制御するための最適なセキュリティコントロールは次のうちどれか。（2つ選択）",
    "choices": [
      {
        "letter": "A",
        "text": "スワイプカード"
      },
      {
        "letter": "B",
        "text": "写真付きID"
      },
      {
        "letter": "C",
        "text": "電話認証アプリケーション"
      },
      {
        "letter": "D",
        "text": "生体認証スキャナー"
      },
      {
        "letter": "E",
        "text": "カメラ"
      },
      {
        "letter": "F",
        "text": "記憶式"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 45,
    "original_num": 283,
    "question": "サードパーティリスク管理における継続的なベンダー監視の方法を最もよく説明しているのは次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "プロジェクトごとに新しいMSAを要求する"
      },
      {
        "letter": "B",
        "text": "さらなる検証なしにベンダーの自己証明を受け入れる"
      },
      {
        "letter": "C",
        "text": "セキュリティ要件への準拠を検証するための評価を実施する"
      },
      {
        "letter": "D",
        "text": "契約開始時にSLAを確認する"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 46,
    "original_num": 298,
    "question": "セキュリティアナリストが以下のログを確認している。最も発生している可能性が高い攻撃は次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "パスワードスプレー"
      },
      {
        "letter": "B",
        "text": "アカウント偽造"
      },
      {
        "letter": "C",
        "text": "Pass-the-Hash"
      },
      {
        "letter": "D",
        "text": "ブルートフォース"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 47,
    "original_num": 313,
    "question": "レガシーシステムを特定するために最も使用される可能性が高い方法は次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "脆弱性スキャン"
      },
      {
        "letter": "B",
        "text": "バグバウンティプログラム"
      },
      {
        "letter": "C",
        "text": "動的解析"
      },
      {
        "letter": "D",
        "text": "パッケージ監視"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 48,
    "original_num": 315,
    "question": "セキュリティアナリストが企業のエンドポイントからの異常なアウトバウンドトラフィックを調査している。トラフィックは暗号化されており、非標準ポートを使用している。このトラフィックが悪意のあるものかどうかを確認するために、アナリストが最初に使用すべきデータソースは次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "アプリケーションログ"
      },
      {
        "letter": "B",
        "text": "脆弱性スキャン"
      },
      {
        "letter": "C",
        "text": "エンドポイントログ"
      },
      {
        "letter": "D",
        "text": "パケットキャプチャ"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 49,
    "original_num": 316,
    "question": "セキュリティチームが、サードパーティがペネトレーションテストを実施した後に提出されたレポートの所見を確認している。所見の1つは、Webアプリケーションのフォームフィールドがクロスサイトスクリプティングに対して脆弱であることを示していた。この脆弱性を防ぐために、セキュリティアナリストが開発者に実装を推奨すべきアプリケーションセキュリティ技術は次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "セキュアCookie"
      },
      {
        "letter": "B",
        "text": "バージョン管理"
      },
      {
        "letter": "C",
        "text": "入力検証"
      },
      {
        "letter": "D",
        "text": "コード署名"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 50,
    "original_num": 320,
    "question": "セキュリティアナリストが、以下のログを含むWebサーバーからのアラートを受信した。GET /image?filename=../../../etc/passwd Host: AcmeInc.web.net useragent: python-request/2.27.1 GET /image?filename=../../../etc/shadow Host: AcmeInc.web.net useragent: python-request/2.27.1 試みられている攻撃は次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "ファイルインジェクション"
      },
      {
        "letter": "B",
        "text": "権限昇格"
      },
      {
        "letter": "C",
        "text": "ディレクトリトラバーサル"
      },
      {
        "letter": "D",
        "text": "Cookie偽造"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 51,
    "original_num": 324,
    "question": "ある企業が、ペネトレーションテストとソーシャルエンジニアリングを含む攻撃的セキュリティ評価を実施するためにコンサルタントを雇った。この評価活動を実施するのは次のうちどのチームか。",
    "choices": [
      {
        "letter": "A",
        "text": "ホワイト"
      },
      {
        "letter": "B",
        "text": "パープル"
      },
      {
        "letter": "C",
        "text": "ブルー"
      },
      {
        "letter": "D",
        "text": "レッド"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 52,
    "original_num": 326,
    "question": "複数のソースからシステム、アプリケーション、およびネットワークのログを一元化されたシステムに収集するセキュリティアラートおよび監視ツールを説明しているのは次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "SIEM"
      },
      {
        "letter": "B",
        "text": "DLP"
      },
      {
        "letter": "C",
        "text": "IDS"
      },
      {
        "letter": "D",
        "text": "SNMP"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 53,
    "original_num": 328,
    "question": "著名な音楽グループのWebサイトを改ざんする可能性が最も高い脅威アクターは次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "スキルの低い攻撃者"
      },
      {
        "letter": "B",
        "text": "組織犯罪"
      },
      {
        "letter": "C",
        "text": "国家支援型"
      },
      {
        "letter": "D",
        "text": "内部脅威"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 54,
    "original_num": 330,
    "question": "未知のソースが組織のネットワークを複数回攻撃している。組織にはファイアウォールがあるが、これらの攻撃に対する他の保護手段がない。追加するのに最適なセキュリティ製品は次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "SIEM"
      },
      {
        "letter": "B",
        "text": "ロードバランサー"
      },
      {
        "letter": "C",
        "text": "UTM"
      },
      {
        "letter": "D",
        "text": "IPS"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 55,
    "original_num": 332,
    "question": "インシデントの可能性を調査中に、セキュリティアナリストが以下のログエントリを発見した。67.118.34.157 ----- [28/Jul/2022:10:26:59 -0300] \"GET /query.php?q-wireless%20headphones / HTTP/1.0\" 200 12737 132.18.222.103 ----[28/Jul/2022:10:27:10 -0300] \"GET /query.php?q=123 INSERT INTO users VALUES ('temp', 'pass123')# / HTTP/1.0\" 200 935 12.45.101.121 ----- [28/Jul/2022:10:27:22 -0300] \"GET /query.php?q=mp3%20players I HTTP/1.0\" 200 14650 アナリストが最初に行うべきことは次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "WAFを導入する"
      },
      {
        "letter": "B",
        "text": "query.phpスクリプトを無効にする"
      },
      {
        "letter": "C",
        "text": "一時ユーザーに対するブルートフォース攻撃をブロックする"
      },
      {
        "letter": "D",
        "text": "usersテーブルに新しいアカウントがないか確認する"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 56,
    "original_num": 336,
    "question": "ある組織が老朽化したネットワーク機器の寄付を検討している。ネットワークの詳細情報の漏洩を防ぐために、組織が実施すべきことは次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "破壊"
      },
      {
        "letter": "B",
        "text": "サニタイズ"
      },
      {
        "letter": "C",
        "text": "認証"
      },
      {
        "letter": "D",
        "text": "データ保持"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 57,
    "original_num": 342,
    "question": "経理部門の従業員が、会社の支払い処理に使用されるWebサイトにログインした。ログイン後、新しいデスクトップアプリケーションが従業員のコンピューターに自動的にダウンロードされ、コンピューターが再起動した。発生した攻撃は次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "XSS"
      },
      {
        "letter": "B",
        "text": "水飲み場攻撃"
      },
      {
        "letter": "C",
        "text": "タイポスクワッティング"
      },
      {
        "letter": "D",
        "text": "バッファオーバーフロー"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 58,
    "original_num": 350,
    "question": "オープンなサービスポートが組織の攻撃対象領域をどのように拡大するかを最もよく説明しているのは次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "スキャン中にエンドポイントのウイルス対策ツールによって見落とされることが多い。"
      },
      {
        "letter": "B",
        "text": "会社のリモートエントリーポイントをインターネットに公開する可能性がある。"
      },
      {
        "letter": "C",
        "text": "脆弱性の期間を短縮するために、アプリケーションの自動更新を有効にする。"
      },
      {
        "letter": "D",
        "text": "適切に制限されていない場合、不要なサービスを不正アクセスにさらす可能性がある。"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 59,
    "original_num": 359,
    "question": "システム間のトラフィックを許可する前に検証を最も必要とするセキュリティ原則は次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "ポリシーの適用"
      },
      {
        "letter": "B",
        "text": "認証"
      },
      {
        "letter": "C",
        "text": "ゼロトラストアーキテクチャ"
      },
      {
        "letter": "D",
        "text": "機密性"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 60,
    "original_num": 372,
    "question": "ある企業がクラウドベースのサービスへの移行を進めている。企業のIT部門は、移行および継続的なサポートのためのリソースが限られている。企業のニーズに最も適しているのは次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "IPS"
      },
      {
        "letter": "B",
        "text": "WAF"
      },
      {
        "letter": "C",
        "text": "SASE"
      },
      {
        "letter": "D",
        "text": "IAM"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 61,
    "original_num": 390,
    "question": "経営陣が災害復旧計画の策定を義務付けている。コストは最小限に抑える必要があり、追加のインターネット接続に資金を充てる余裕がない。最適な選択肢は次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "ホットサイト"
      },
      {
        "letter": "B",
        "text": "コールドサイト"
      },
      {
        "letter": "C",
        "text": "フェイルオーバーサイト"
      },
      {
        "letter": "D",
        "text": "ウォームサイト"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 62,
    "original_num": 396,
    "question": "ネットワーク管理者がすべてのエンドユーザーワークステーションにFDEソリューションを展開している。これが説明しているデータ保護戦略は次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "マスキング"
      },
      {
        "letter": "B",
        "text": "転送中のデータ"
      },
      {
        "letter": "C",
        "text": "難読化"
      },
      {
        "letter": "D",
        "text": "保存データ"
      },
      {
        "letter": "E",
        "text": "データ主権"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 63,
    "original_num": 397,
    "question": "ペネトレーションテスターが建物の警報システムのセキュリティをテストしている。実施されているペネトレーションテストの種類は次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "物理的"
      },
      {
        "letter": "B",
        "text": "防御的"
      },
      {
        "letter": "C",
        "text": "統合的"
      },
      {
        "letter": "D",
        "text": "継続的"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 64,
    "original_num": 406,
    "question": "プロセスに二人制の完全性セキュリティコントロールが必要な理由を最もよく説明しているのは次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "1人のユーザーだけで完了するのにかかる時間の半分でアクティビティが完了する可能性を高めるため"
      },
      {
        "letter": "B",
        "text": "別の部門の2人のユーザーが、権限のあるユーザーによって実行されるアクティビティを観察できるようにするため"
      },
      {
        "letter": "C",
        "text": "手順が不正確に実行されたり、権限のないユーザーによって実行されたりするリスクを軽減するため"
      },
      {
        "letter": "D",
        "text": "CCTVカメラに録画されている間に1人がアクティビティを実行できるようにするため"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 65,
    "original_num": 407,
    "question": "セキュリティチームは、アプリケーションの展開時にWAFポリシーが自動的に作成されることを望んでいる。この機能を説明する概念は次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "IaC"
      },
      {
        "letter": "B",
        "text": "IoT"
      },
      {
        "letter": "C",
        "text": "IoC"
      },
      {
        "letter": "D",
        "text": "IaaS"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 66,
    "original_num": 408,
    "question": "ある企業のCISO（最高情報セキュリティ責任者）が、インシデント対応チームの能力を強化したいと考えている。CISOはインシデント対応チームに対し、侵害された可能性のあるシステムからホストおよびネットワークのデータを迅速に分析し、さらなるレビューのためにデータを転送するツールの導入を指示した。インシデント対応チームが導入すべきツールは次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "NAC"
      },
      {
        "letter": "B",
        "text": "IPS"
      },
      {
        "letter": "C",
        "text": "SIEM"
      },
      {
        "letter": "D",
        "text": "EDR"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 67,
    "original_num": 420,
    "question": "複数のフィッシングシミュレーションの後、最高セキュリティ責任者は、次の四半期にフィッシングリンクをクリックしないよう従業員にインセンティブを与える新しいプログラムを発表した。これが表すセキュリティ意識向上の実施技法は次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "コンピューターベーストレーニング"
      },
      {
        "letter": "B",
        "text": "内部脅威への意識向上"
      },
      {
        "letter": "C",
        "text": "SOARプレイブック"
      },
      {
        "letter": "D",
        "text": "ゲーミフィケーション"
      },
      {
        "letter": "E",
        "text": "ゲーミフィケーション"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 68,
    "original_num": 423,
    "question": "ある企業がランサムウェア攻撃から復旧するためにバックアップを使用している。バックアップが感染していないことを最も保証するのは次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "イミュータビリティ（不変性）"
      },
      {
        "letter": "B",
        "text": "破壊"
      },
      {
        "letter": "C",
        "text": "サニタイズ"
      },
      {
        "letter": "D",
        "text": "保持"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 69,
    "original_num": 426,
    "question": "事業継続性の机上演習を実施中に、セキュリティチームがフェイルオーバー時に発電機が故障した場合の潜在的な影響を懸念している。リスク管理活動に関して、チームが最も考慮する可能性が高いのは次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "RPO"
      },
      {
        "letter": "B",
        "text": "ARO"
      },
      {
        "letter": "C",
        "text": "BIA"
      },
      {
        "letter": "D",
        "text": "MTTR"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 70,
    "original_num": 428,
    "question": "OSINTの一般的な使用法を最もよく説明しているのは次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "内部システムとネットワークトラフィックを監視して異常な動作を検出する"
      },
      {
        "letter": "B",
        "text": "既知の脆弱性を修正するためにセキュリティパッチをインストールおよび設定する"
      },
      {
        "letter": "C",
        "text": "公開プラットフォームから情報を収集して、セキュリティ上の露出の可能性を発見する"
      },
      {
        "letter": "D",
        "text": "機密性の高い企業データを暗号化し、クラウドに安全に保存する"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 71,
    "original_num": 441,
    "question": "ある企業は、勤務時間中は従業員が仮想デスクトップからファイルをコピーできるようにし、勤務時間外は制限したいと考えている。企業が設定すべきセキュリティ対策は次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "デジタル著作権管理"
      },
      {
        "letter": "B",
        "text": "ロールベースアクセス制御"
      },
      {
        "letter": "C",
        "text": "時間ベースアクセス制御"
      },
      {
        "letter": "D",
        "text": "ネットワークアクセス制御"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 72,
    "original_num": 453,
    "question": "ある小規模企業が、スクリーンドサブネットへの広範なアクセスを許可するために、ファイアウォール上で一般的な通信ポート（21、22、25、80、443）を開放する計画を当初立てていた。しかし、セキュリティコンサルタントはこの措置に反対した。コンサルタントが対処しているセキュリティ原則は次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "セキュアアクセスサービスエッジ"
      },
      {
        "letter": "B",
        "text": "攻撃対象領域"
      },
      {
        "letter": "C",
        "text": "最小権限"
      },
      {
        "letter": "D",
        "text": "職務の分離"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 73,
    "original_num": 455,
    "question": "外部セキュリティ評価レポートが、不審なメールに対するクリック率が高いことを示している。CISO（最高情報セキュリティ責任者）はこの行動を減らす必要がある。CISOが最初に行うべきことは次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "利用規定を更新する。"
      },
      {
        "letter": "B",
        "text": "パスワード管理ソリューションを導入する。"
      },
      {
        "letter": "C",
        "text": "影響を受けたユーザーに警告文書を発行する。"
      },
      {
        "letter": "D",
        "text": "フィッシング意識向上キャンペーンを実施する。"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 74,
    "original_num": 462,
    "question": "最高情報セキュリティ責任者が、セキュリティコミュニティに対して、組織の公開資産における脆弱性を報告する機会を提供している。このシナリオを最もよく説明しているのは次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "バグバウンティ"
      },
      {
        "letter": "B",
        "text": "レッドチーム"
      },
      {
        "letter": "C",
        "text": "オープンソースインテリジェンス"
      },
      {
        "letter": "D",
        "text": "サードパーティ情報共有"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 75,
    "original_num": 463,
    "question": "権限のないユーザーが従業員の電話用ネットワークポートにラップトップを接続し、ツールを使用してデータベースサーバーをスキャンすることを防ぐ最善の方法は次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "MACフィルタリング"
      },
      {
        "letter": "B",
        "text": "セグメンテーション"
      },
      {
        "letter": "C",
        "text": "認証"
      },
      {
        "letter": "D",
        "text": "分離"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 76,
    "original_num": 471,
    "question": "入力サニタイズによって最も効果的に軽減される例は次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "<script>alert (\"Warning!\") ,-</script>"
      },
      {
        "letter": "B",
        "text": "nmap - 10.11.1.130"
      },
      {
        "letter": "C",
        "text": "メールメッセージ：「このリンクをクリックして無料ギフトカードを入手してください。」"
      },
      {
        "letter": "D",
        "text": "ブラウザメッセージ：「この接続ではプライバシーが保護されません。」"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 77,
    "original_num": 474,
    "question": "セキュリティアナリストが、ネットワークに接続されている現在のエンドポイント資産の月次監査中に不正なデバイスを発見した。企業ネットワークはアクセス制御に802.1Xを使用している。ネットワークへの接続を許可されるには、デバイスは既知のハードウェアアドレスを持ち、キャプティブポータルで有効なユーザー名とパスワードを入力する必要がある。以下は監査レポートである。不正なデバイスが接続を許可された最も可能性の高い方法は次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "ユーザーが個人デバイスでMACクローニング攻撃を行った。"
      },
      {
        "letter": "B",
        "text": "DHCPの障害により、誤ったIPアドレスが配布された。"
      },
      {
        "letter": "C",
        "text": "管理者がテストのためにセキュリティコントロールをバイパスした。"
      },
      {
        "letter": "D",
        "text": "DNSハイジャックにより、攻撃者がキャプティブポータルのトラフィックを傍受した。"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 78,
    "original_num": 478,
    "question": "ある企業がコスト削減のために、請負業者と社内従業員が使用するアプリケーションのアクセス制御の拡大を検討している。アプリケーションへのアクセスを許可する前に、実装チームが理解すべきリスク要素は次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "しきい値"
      },
      {
        "letter": "B",
        "text": "リスク選好度"
      },
      {
        "letter": "C",
        "text": "リスク許容度"
      },
      {
        "letter": "D",
        "text": "リスク登録簿"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 79,
    "original_num": 482,
    "question": "経営チームが、脅威シナリオに対するサイバーセキュリティチームの対応準備態勢を評価したいと考えている。短時間で適切に評価し、対応を形式化できるのは次のうちどれか。",
    "choices": [
      {
        "letter": "A",
        "text": "すべてのITマネージャーにメッセージを送り、正式なアクションプランを要求する。"
      },
      {
        "letter": "B",
        "text": "バグバウンティプログラムを作成し、結果を評価する。"
      },
      {
        "letter": "C",
        "text": "机上演習を実施し、パフォーマンス結果を文書化する。"
      },
      {
        "letter": "D",
        "text": "外部コンサルタントを雇い、サイバーセキュリティプロセスを独立して評価してもらう。"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 80,
    "original_num": 494,
    "question": "セキュリティ管理者が元従業員のラップトップを再発行しようとしている。管理者が実行すべきデータ取り扱いアクティビティの最適な組み合わせは次のうちどれか。（2つ選択）",
    "choices": [
      {
        "letter": "A",
        "text": "データ保持"
      },
      {
        "letter": "B",
        "text": "認証"
      },
      {
        "letter": "C",
        "text": "トークン化"
      },
      {
        "letter": "D",
        "text": "分類"
      },
      {
        "letter": "E",
        "text": "サニタイズ"
      },
      {
        "letter": "F",
        "text": "列挙"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 81,
    "original_num": 507,
    "question": "セキュリティ意識向上プログラムにおけるコミュニケーションの要素として含まれる可能性が最も高いものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "フィッシングの試みやその他の不審な活動の報告"
      },
      {
        "letter": "B",
        "text": "異常な行動認識を使用した内部脅威の検出"
      },
      {
        "letter": "C",
        "text": "電信送金データを変更する際の情報の検証"
      },
      {
        "letter": "D",
        "text": "サードパーティのペネトレーションテストの一環としてのソーシャルエンジニアリングの実施"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 82,
    "original_num": 515,
    "question": "セキュリティアナリストは、パスワード監査の結果を受けて、会社の認証ポリシーを改善する必要があります。ポリシーに含めるべきものはどれですか？（2つ選択）",
    "choices": [
      {
        "letter": "A",
        "text": "長さ"
      },
      {
        "letter": "B",
        "text": "複雑さ"
      },
      {
        "letter": "C",
        "text": "最小権限"
      },
      {
        "letter": "D",
        "text": "所持しているもの"
      },
      {
        "letter": "E",
        "text": "セキュリティキー"
      },
      {
        "letter": "F",
        "text": "生体認証"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 83,
    "original_num": 518,
    "question": "スキャンレポートにおける偽陰性の脆弱性検出の例はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "実際には存在しない脆弱性"
      },
      {
        "letter": "B",
        "text": "すでに修正済みの脆弱性"
      },
      {
        "letter": "C",
        "text": "既知の脆弱性が検出されなかった結果"
      },
      {
        "letter": "D",
        "text": "既知の修正方法があるゼロデイ脆弱性"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 84,
    "original_num": 523,
    "question": "セキュリティ意識向上トレーニングを更新する際、セキュリティアナリストはベンダーのメールアカウントが侵害された場合に生じる問題に対処したいと考えています。セキュリティアナリストがトレーニングに含めるべき推奨事項はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "新しいベンダーからのメールに含まれる画像をクリックしないようにする。"
      },
      {
        "letter": "B",
        "text": "不明なサービスプロバイダーパートナーからのメールを削除する。"
      },
      {
        "letter": "C",
        "text": "請求書は添付ファイルとして送信することを要求する。"
      },
      {
        "letter": "D",
        "text": "知っているメールアドレスからの予期しないリクエストに注意する。"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 85,
    "original_num": 531,
    "question": "ネットワークセキュリティアナリストがネットワークのIDSを監視しており、異常な活動がフラグ付けされました。IDSは短期間にデータベースサーバーへの複数のログイン試行を検出しました。これらの試行は、ネットワークの通常のトラフィックパターンでは通常認識されないさまざまなIPアドレスから発信されています。各試行は同じユーザー名とパスワードを使用しています。以下のログ出力に基づいて（読みやすさのためにフォーマットを修正）：2025-04-10 14:22:01.4532 - Source IP: 192.168.15.101 - Status: Failed - User: JDoe - Action: Login Attempt 2025-04-10 14:22:02.1122 - Source IP: 192.168.15.102 - Status: Failed - User: JDoe - Action: Login Attempt 2025-04-10 14:22:02.7835 - Source IP: 192.168.15.103 - Status: Failed - User: JDoe - Action: Login Attempt 2025-04-10 14:22:03.5637 - Source IP: 192.168.15.104 - Status: Failed - User: JDoe - Action: Login Attempt 2025-04-10 14:22:04.9474 - Source IP: 192.168.15.105 - Status: Failed - User: JDoe - Action: Login Attempt 2025-04-10 14:22:05.5673 - Source IP: 192.168.15.106 - Status: Failed - User: JDoe - Action: Login Attempt 2025-04-10 14:22:06.1573 - Source IP: 192.168.15.107 - Status: Failed - User: JDoe - Action: Login Attempt 2025-04-10 14:22:07.7462 - Source IP: 192.168.15.108 - Status: Failed - User: JDoe - Action: Login Attempt 最も発生している可能性が高いネットワーク攻撃の種類はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "クロスサイトスクリプティング"
      },
      {
        "letter": "B",
        "text": "クレデンシャルリプレイ"
      },
      {
        "letter": "C",
        "text": "分散型サービス拒否攻撃"
      },
      {
        "letter": "D",
        "text": "SQLインジェクション"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 86,
    "original_num": 533,
    "question": "以下の脆弱性スキャンレポートを確認した後：Server:192.168.14.6 Service: Telnet Port: 23 Protocol: TCP Status: Open Severity: High Vulnerability: Use of an insecure network protocol セキュリティアナリストが以下のテストを実施しました：nmap -p 23 192.168.14.6 -script telnet-encryption PORT STATE SERVICE REASON 23/tcp open telnet syn-ack I telnet encryption: | _ Telnet server supports encryption この報告された脆弱性について、セキュリティアナリストはどのような結論を出しますか？",
    "choices": [
      {
        "letter": "A",
        "text": "偽陽性である。"
      },
      {
        "letter": "B",
        "text": "再スキャンが必要である。"
      },
      {
        "letter": "C",
        "text": "ノイズと見なされる。"
      },
      {
        "letter": "D",
        "text": "補償的コントロールが存在する。"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 87,
    "original_num": 534,
    "question": "新しい脆弱性が公開された際に、セキュリティアナリストが組織全体のリスクを正確に測定できるようにするために最も役立つものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "すべてのハードウェアおよびソフトウェアの完全なインベントリ"
      },
      {
        "letter": "B",
        "text": "システム分類の文書"
      },
      {
        "letter": "C",
        "text": "システム所有者とその部門のリスト"
      },
      {
        "letter": "D",
        "text": "サードパーティのリスク評価文書"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 88,
    "original_num": 547,
    "question": "ある企業が、広く使用されているネットワークデバイスベンダーが政府により禁止されたというアラートを受け取りました。ハードウェアの更新において、法務顧問が最も懸念する可能性が高い事項はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "制裁"
      },
      {
        "letter": "B",
        "text": "データ主権"
      },
      {
        "letter": "C",
        "text": "交換コスト"
      },
      {
        "letter": "D",
        "text": "ライセンスの喪失"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 89,
    "original_num": 549,
    "question": "あるオフィスがWi-Fiネットワークを設置したいと考えています。セキュリティチームは安全な設計を確保する必要があります。アクセスポイントはより高性能で、16文字のランダム化されたキーを使用したWPA3を使用します。セキュリティチームが次に行うべきことはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "建物の外周のヒートマップを作成する。"
      },
      {
        "letter": "B",
        "text": "各アクセスポイントからコントローラーへのIPSecトンネルを展開する。"
      },
      {
        "letter": "C",
        "text": "24文字のランダム化されたキーを使用したWPA2-PSKを有効にする。"
      },
      {
        "letter": "D",
        "text": "すべてのアクセスポイントでSSH管理を無効にする。"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 90,
    "original_num": 559,
    "question": "データベース管理者が、保留中の購入のクレジットカード情報を保存する会社のSQLデータベースを更新しています。潜在的な侵害に対してデータを保護するための最善の方法はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "ハッシュ化"
      },
      {
        "letter": "B",
        "text": "難読化"
      },
      {
        "letter": "C",
        "text": "トークン化"
      },
      {
        "letter": "D",
        "text": "マスキング"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 91,
    "original_num": 568,
    "question": "ある組織が、相互接続された金融システムのグループに対する是正的コントロールの実装に関連する新しい規制要件を評価しています。新しい要件の最も考えられる理由はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "銀行の詳細を変更する内部脅威から防御するため"
      },
      {
        "letter": "B",
        "text": "エラーが他のシステムに伝搬しないようにするため"
      },
      {
        "letter": "C",
        "text": "事業保険の購入を可能にするため"
      },
      {
        "letter": "D",
        "text": "財務データへの不正な変更を防止するため"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 92,
    "original_num": 571,
    "question": "ある組織が、顧客情報を含むクラウドホスト型ソリューションの侵害を経験しました。侵害の機密性レベルを判断するのに役立つ戦略はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "権限の制限"
      },
      {
        "letter": "B",
        "text": "机上演習"
      },
      {
        "letter": "C",
        "text": "データ分類"
      },
      {
        "letter": "D",
        "text": "資産インベントリ"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 93,
    "original_num": 572,
    "question": "インシデントが適切なレベルの注意と対応を受けることを確保するために、チケット自動化によって実行するのに最も適したアクションはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "通知"
      },
      {
        "letter": "B",
        "text": "作成"
      },
      {
        "letter": "C",
        "text": "クローズ"
      },
      {
        "letter": "D",
        "text": "エスカレーション"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 94,
    "original_num": 579,
    "question": "セキュリティ担当者が会社のネットワークに対して脆弱性評価を完了し、いくつかの脆弱性を発見しました。運用チームがそれらを修正しました。次に行うべきことはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "監査を実施する。"
      },
      {
        "letter": "B",
        "text": "ペネトレーションテストを開始する。"
      },
      {
        "letter": "C",
        "text": "ネットワークを再スキャンする。"
      },
      {
        "letter": "D",
        "text": "レポートを提出する。"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 95,
    "original_num": 583,
    "question": "ある製造組織がペネトレーションテストの結果を受け取りました。結果によると、事業継続に不可欠なレガシーデバイスに脆弱性が表示されています。これらのデバイスはベンダーのサポートが最小限であり、セグメント化して厳密に監視する必要があります。最も特定された可能性が高いデバイスはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "ワークステーション"
      },
      {
        "letter": "B",
        "text": "組み込みシステム"
      },
      {
        "letter": "C",
        "text": "コアルーター"
      },
      {
        "letter": "D",
        "text": "DNSサーバー"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 96,
    "original_num": 586,
    "question": "ファイアウォールの設定をトラブルシューティング中に、技術者はACLの末尾に「deny any」ポリシーを追加すべきであると判断しました。技術者がポリシーを更新しましたが、新しいポリシーにより、いくつかの会社のサーバーが到達不能になりました。この問題を防ぐためのアクションはどれですか？",
    "choices": [
      {
        "letter": "L",
        "text": "技術者がポリシーを更新しましたが、新しいポリシーにより、いくつかの会社のサーバーが到達不能になりました。この問題を防ぐためのアクションはどれですか？"
      },
      {
        "letter": "A",
        "text": "新しいポリシーを変更リクエストに文書化し、変更管理に提出する"
      },
      {
        "letter": "B",
        "text": "本番ネットワークでポリシーを有効にする前に、非本番環境でポリシーをテストする"
      },
      {
        "letter": "C",
        "text": "新しいポリシーを有効にする前に、「deny any」ポリシーの侵入防止シグネチャを無効にする"
      },
      {
        "letter": "D",
        "text": "「deny any」ポリシーの上に「allow any」ポリシーを含める"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 97,
    "original_num": 588,
    "question": "経理部門の従業員が、ベンダーが実施したサービスに対する支払い要求を含むメールを受け取りました。しかし、そのベンダーはベンダー管理データベースに登録されていません。このシナリオはどのような攻撃の例ですか？",
    "choices": [
      {
        "letter": "A",
        "text": "プリテキスティング"
      },
      {
        "letter": "B",
        "text": "なりすまし"
      },
      {
        "letter": "C",
        "text": "ランサムウェア"
      },
      {
        "letter": "D",
        "text": "請求書詐欺"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 98,
    "original_num": 591,
    "question": "サイバーセキュリティの知識を持つ新任の取締役会メンバーが、組織に影響を与えたインシデントの数を詳述する四半期レポートを取締役会が受け取ることを望んでいます。システム管理者は取締役会にデータを提示する方法を作成しています。システム管理者が使用すべきものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "パケットキャプチャ"
      },
      {
        "letter": "B",
        "text": "脆弱性スキャン"
      },
      {
        "letter": "C",
        "text": "メタデータ"
      },
      {
        "letter": "D",
        "text": "ダッシュボード"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 99,
    "original_num": 595,
    "question": "追加のメールサーバーを展開してから数週間後、メッセージが受信者のスパムフォルダーに入っているという苦情が届き始めました。更新が必要なものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "CNAME"
      },
      {
        "letter": "B",
        "text": "SMTP"
      },
      {
        "letter": "C",
        "text": "DLP"
      },
      {
        "letter": "D",
        "text": "SPF"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 100,
    "original_num": 597,
    "question": "最高情報セキュリティ責任者がリスク評価中に特定された既知の脆弱性を無視する場合、使用されているリスク管理戦略はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "転嫁"
      },
      {
        "letter": "B",
        "text": "回避"
      },
      {
        "letter": "C",
        "text": "軽減"
      },
      {
        "letter": "D",
        "text": "受容"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 101,
    "original_num": 599,
    "question": "セキュリティアナリストが、内部システムが営業時間外に短期間でインターネット上のシステムに大量の異常なDNSクエリを送信しているというアラートを受け取りました。最も発生している可能性が高いものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "ワームがネットワーク全体に拡散している。"
      },
      {
        "letter": "B",
        "text": "データが外部に持ち出されている。"
      },
      {
        "letter": "C",
        "text": "ロジックボムがデータを削除している。"
      },
      {
        "letter": "D",
        "text": "ランサムウェアがファイルを暗号化している。"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 102,
    "original_num": 600,
    "question": "さまざまなデバイスやサービスからログを受信し、アラートを提示するものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "SIEM"
      },
      {
        "letter": "B",
        "text": "SCADA"
      },
      {
        "letter": "C",
        "text": "SNMP"
      },
      {
        "letter": "D",
        "text": "SCAP"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 103,
    "original_num": 607,
    "question": "新しいコンプライアンス監査要件の一環として、複数のサーバーを異なるネットワーク上にセグメント化し、許可された内部システムからのみ到達可能にする必要があります。要件を満たすものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "内部リソースへの外部アクセスをブロックするファイアウォールルールを設定する。"
      },
      {
        "letter": "B",
        "text": "パブリックネットワークからの内部アクセスを許可するWAPを設置する。"
      },
      {
        "letter": "C",
        "text": "内部リソースからの新しいIPSecトンネルを実装する。"
      },
      {
        "letter": "D",
        "text": "リソースにアクセスするための内部ジャンプサーバーを展開する。"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 104,
    "original_num": 613,
    "question": "セキュリティアナリストが、従業員が訪問者バッジを発行するために使用する企業エンドポイントからアラートを受信しました。アラートには以下の詳細が含まれています。アラートをトリガーした指標を最もよく説明するものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "ブロックされたコンテンツ"
      },
      {
        "letter": "B",
        "text": "ブルートフォース攻撃"
      },
      {
        "letter": "C",
        "text": "同時セッション使用"
      },
      {
        "letter": "D",
        "text": "アカウントロックアウト"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 105,
    "original_num": 614,
    "question": "セキュリティエンジニアが組織内のすべてのラップトップにFDEを実装しようとしています。計画プロセスの一環として、エンジニアが考慮すべき最も重要な事項はどれですか？（2つ選択）",
    "choices": [
      {
        "letter": "A",
        "text": "キーエスクロー"
      },
      {
        "letter": "B",
        "text": "TPMの存在"
      },
      {
        "letter": "C",
        "text": "デジタル署名"
      },
      {
        "letter": "D",
        "text": "データトークン化"
      },
      {
        "letter": "E",
        "text": "公開鍵管理"
      },
      {
        "letter": "F",
        "text": "認証局のリンク"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 106,
    "original_num": 618,
    "question": "ある店舗が従業員向けのワイヤレスアクセスを設定しています。管理者はアクセスポイントの数を制限しながら、完全なカバレッジを確保したいと考えています。必要なアクセスポイント数を決定するのに役立つツールはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "シグナルロケーター"
      },
      {
        "letter": "B",
        "text": "WPA3"
      },
      {
        "letter": "C",
        "text": "ヒートマップ"
      },
      {
        "letter": "D",
        "text": "サイトサーベイ"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 107,
    "original_num": 628,
    "question": "新しいソフトウェアリリースがユーザーに届く前に改ざんされていないことを確認するために使用すべきものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "トークン化"
      },
      {
        "letter": "B",
        "text": "暗号化"
      },
      {
        "letter": "C",
        "text": "ハッシュ化"
      },
      {
        "letter": "D",
        "text": "難読化"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 108,
    "original_num": 629,
    "question": "証明書がユーザーに提示された際にその証明書を検証するために使用されるものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "OCSP"
      },
      {
        "letter": "B",
        "text": "CSR"
      },
      {
        "letter": "C",
        "text": "CA"
      },
      {
        "letter": "D",
        "text": "CRC"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 109,
    "original_num": 633,
    "question": "IT管理者が、世界的なインシデントが発生した場合に組織がどのように運営を継続するかを記述した文書化された計画を作成しています。IT管理者が作成しているのはどの計画ですか？",
    "choices": [
      {
        "letter": "A",
        "text": "事業継続計画"
      },
      {
        "letter": "B",
        "text": "物理的セキュリティ"
      },
      {
        "letter": "C",
        "text": "変更管理"
      },
      {
        "letter": "D",
        "text": "災害復旧"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 110,
    "original_num": 641,
    "question": "ある企業が、セキュリティ境界を通過するトラフィックを最小限に抑えながら、内部リソースへの管理アクセスを提供する必要があります。最も安全な方法はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "踏み台サーバーの実装"
      },
      {
        "letter": "B",
        "text": "境界ネットワークの展開"
      },
      {
        "letter": "C",
        "text": "WAFのインストール"
      },
      {
        "letter": "D",
        "text": "シングルサインオンの利用"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 111,
    "original_num": 642,
    "question": "管理者が、ユーザーが大量の未承諾メッセージを受信していることを知りました。管理者がコンテンツフィルターを確認すると、複数のユーザーに送信された数百のメッセージが見つかりました。この種の攻撃を最もよく説明するものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "水飲み場攻撃"
      },
      {
        "letter": "B",
        "text": "タイポスクワッティング"
      },
      {
        "letter": "C",
        "text": "ビジネスメール詐欺"
      },
      {
        "letter": "D",
        "text": "フィッシング"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 112,
    "original_num": 643,
    "question": "データを暗号化する際の最も重要な考慮事項はどれですか？（2つ選択）",
    "choices": [
      {
        "letter": "A",
        "text": "難読化"
      },
      {
        "letter": "B",
        "text": "アルゴリズム"
      },
      {
        "letter": "C",
        "text": "データマスキング"
      },
      {
        "letter": "D",
        "text": "鍵長"
      },
      {
        "letter": "E",
        "text": "トークン化"
      },
      {
        "letter": "F",
        "text": "ソルティング"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 113,
    "original_num": 656,
    "question": "Webサイトのユーザーが、メールのリンクをクリックして別のWebサイトにアクセスした後、アカウントからロックアウトされました。Webサーバーのログでは、ユーザーがパスワードを変更していないにもかかわらず、パスワードが変更されたことが示されています。最も考えられる原因はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "クロスサイトリクエストフォージェリ"
      },
      {
        "letter": "B",
        "text": "ディレクトリトラバーサル"
      },
      {
        "letter": "C",
        "text": "ARPポイズニング"
      },
      {
        "letter": "D",
        "text": "SQLインジェクション"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 114,
    "original_num": 672,
    "question": "ある組織に、金融システムに是正的コントロールを実装するという新しい規制要件があります。新しい要件の最も考えられる理由はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "銀行の詳細を変更する内部脅威から防御するため"
      },
      {
        "letter": "B",
        "text": "エラーが他のシステムに伝搬しないようにするため"
      },
      {
        "letter": "C",
        "text": "事業保険の購入を可能にするため"
      },
      {
        "letter": "D",
        "text": "財務データへの不正な変更を防止するため"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 115,
    "original_num": 682,
    "question": "ベンダーが対応する必要がある時間枠を定義する契約の種類はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "SOW"
      },
      {
        "letter": "B",
        "text": "SLA"
      },
      {
        "letter": "C",
        "text": "MOA"
      },
      {
        "letter": "D",
        "text": "MOU"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 116,
    "original_num": 684,
    "question": "MDMプラットフォームを設置することで最も軽減される可能性が高い脆弱性はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "TPM"
      },
      {
        "letter": "B",
        "text": "バッファオーバーフロー"
      },
      {
        "letter": "C",
        "text": "ジェイルブレイク"
      },
      {
        "letter": "D",
        "text": "SQLインジェクション"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 117,
    "original_num": 693,
    "question": "システム管理者は、ユーザーが職責に基づいてデータにアクセスできないようにしたいと考えています。また、管理者は簡素化された形式で必要なアクセス構造を適用したいと考えています。管理者がサイトリカバリリソースグループに適用すべきものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "RBAC"
      },
      {
        "letter": "B",
        "text": "ACL"
      },
      {
        "letter": "C",
        "text": "SAML"
      },
      {
        "letter": "D",
        "text": "GPO"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 118,
    "original_num": 694,
    "question": "ある企業が、送信するマーケティングメールがスパムとしてフラグ付けされる可能性を最小限に抑えたいと考えています。企業は適切なDNSレコードにメールサーバーを登録することを決定しました。次に適用すべきプロトコルはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "DMARC"
      },
      {
        "letter": "B",
        "text": "DLP"
      },
      {
        "letter": "C",
        "text": "DKIM"
      },
      {
        "letter": "D",
        "text": "SPF"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 119,
    "original_num": 695,
    "question": "RADIUSサーバーのインストールによって実現されるセキュリティコンセプトはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "CIA"
      },
      {
        "letter": "B",
        "text": "AA"
      },
      {
        "letter": "C",
        "text": "ACL"
      },
      {
        "letter": "D",
        "text": "PEM"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 120,
    "original_num": 698,
    "question": "ある企業のオンラインショッピングサイトが、2023年1月30日の深夜直後に使用不能になりました。セキュリティアナリストがデータベースサーバーを確認したところ、データのバックアップに使用された以下のコードに気づきました。アナリストが次に行うべきことはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "最近解雇されたDBAを確認する。"
      },
      {
        "letter": "B",
        "text": "コマンドインジェクションの証拠についてWAFログを確認する。"
      },
      {
        "letter": "C",
        "text": "データベースサーバーのマルウェアスキャンを実行する。"
      },
      {
        "letter": "D",
        "text": "Webサーバーでランサムウェアのメモを検索する。"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 121,
    "original_num": 701,
    "question": "サプライチェーンのサービスプロバイダーが組織にセキュリティ上の脆弱性をもたらす可能性がある方法として、最も適切なものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "システムアップグレードに必要なハードウェアの出荷を遅延させる"
      },
      {
        "letter": "B",
        "text": "カスタマーサービス業務を海外のコールセンターに外部委託する"
      },
      {
        "letter": "C",
        "text": "組織の内部データベースに保存されたデータの暗号化を怠る"
      },
      {
        "letter": "D",
        "text": "クライアントシステムへの特権アクセスを持ち、攻撃者の標的となる"
      }
    ],
    "answer": "D",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 122,
    "original_num": 703,
    "question": "MOUとSOWの主な違いを最もよく説明しているものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "MOUは通常法的拘束力がないが、SOWは通常成果物について法的拘束力がある。"
      },
      {
        "letter": "B",
        "text": "MOUは契約の詳細を特定し、SOWは誰が関与するかを明記する。"
      },
      {
        "letter": "C",
        "text": "MOUは両当事者の署名が必要だが、SOWはサービスプロバイダーの署名のみが必要である。"
      },
      {
        "letter": "D",
        "text": "MOUは通常タスクについて非常に詳細であるが、SOWは通常概要レベルである。"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 123,
    "original_num": 706,
    "question": "最近のブラックボックスペネトレーションテストで、http://example.com の外部ウェブサイトの脆弱性（ディレクトリトラバーサル、クロスサイトスクリプティング、クロスサイトリクエストフォージェリ、安全でないプロトコルなど）が発見されました。あなたは攻撃対象領域を縮小し、安全なプロトコルを有効にする任務を負っています。手順 パート1 ドロップダウンメニューを使用して、安全で回復力のあるWebアーキテクチャを実装するために各場所に適切なテクノロジーを選択してください。すべてのテクノロジーが使用されるわけではなく、テクノロジーは複数回使用される場合があります。パート2 ドロップダウンメニューから適切なコマンドスニペットを選択してください。各コマンドセクションを埋める必要があります。",
    "choices": [],
    "answer": "S",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 124,
    "original_num": 709,
    "question": "内部者による不正操作の脅威から給与システムを最も適切に保護するセキュリティコントロールはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "代替コントロール"
      },
      {
        "letter": "B",
        "text": "抑止コントロール"
      },
      {
        "letter": "C",
        "text": "発見的コントロール"
      },
      {
        "letter": "D",
        "text": "是正コントロール"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 125,
    "original_num": 714,
    "question": "高リスクのWebサイトへのユーザーアクセスを提供する際の代替コントロールとして適切なものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "ファイアウォールの脅威防止機能を有効にする"
      },
      {
        "letter": "B",
        "text": "すべてのWebトラフィックをキャプチャするようにSIEMツールを構成する"
      },
      {
        "letter": "C",
        "text": "任意のポートからその宛先へのトラフィックを許可するファイアウォールルールを設定する"
      },
      {
        "letter": "D",
        "text": "エンドポイント保護ソフトウェアでそのWebサイトをブロックする"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 126,
    "original_num": 721,
    "question": "セキュリティアナリストが偽のアカウントを作成し、容易にアクセスできないディレクトリ内のスプレッドシートにパスワードを保存しました。また、スプレッドシートが開かれた場合にセキュリティチームに通知するアラートも設定しました。展開されている欺瞞手法を最もよく説明しているものはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "ハニーポット"
      },
      {
        "letter": "B",
        "text": "ハニーアカウント"
      },
      {
        "letter": "C",
        "text": "ハニートークン"
      },
      {
        "letter": "D",
        "text": "ハニーネット"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 127,
    "original_num": 727,
    "question": "国家支援の攻撃者が、ジャーナリストが頻繁に利用するWebサイトを侵害することで、複数のジャーナリストのメールアカウントにアクセスしました。この例を説明する攻撃の種類はどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "オンパス攻撃"
      },
      {
        "letter": "B",
        "text": "水飲み場攻撃"
      },
      {
        "letter": "C",
        "text": "タイポスクワッティング"
      },
      {
        "letter": "D",
        "text": "ブランドなりすまし"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 128,
    "original_num": 738,
    "question": "あなたはネットワーク上の潜在的な感染を調査しているセキュリティ管理者です。各ホストとファイアウォールをクリックしてください。すべてのログを確認して、どのホストが感染の発生源であるかを特定し、残りの各ホストがクリーンか感染しているかを判定してください。",
    "choices": [],
    "answer": "I",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 129,
    "original_num": 749,
    "question": "セキュリティアナリストが、会社が購入を予定しているSaaSアプリケーションのセキュリティをレビューしています。セキュリティアナリストがSaaSアプリケーションベンダーに要求すべきドキュメントはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "サービスレベル契約（SLA）"
      },
      {
        "letter": "B",
        "text": "第三者監査報告書"
      },
      {
        "letter": "C",
        "text": "作業範囲記述書（SOW）"
      },
      {
        "letter": "D",
        "text": "データプライバシー契約"
      }
    ],
    "answer": "B",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 130,
    "original_num": 756,
    "question": "管理チームは、会社支給のタブレットで従業員が機能を利用できず、生産性の問題が発生していると報告しています。チームはIT部門に48時間以内に問題を解決するよう指示しました。最適なソリューションはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "EDR"
      },
      {
        "letter": "B",
        "text": "COPE"
      },
      {
        "letter": "C",
        "text": "MDM"
      },
      {
        "letter": "D",
        "text": "FDE"
      }
    ],
    "answer": "C",
    "explanation": "",
    "type": "mc"
  },
  {
    "num": 131,
    "original_num": 759,
    "question": "ある組織が国際的に事業を拡大する計画を立てており、新しい拠点のデータを安全に保つ必要があります。組織は可能な限り最も安全なアーキテクチャモデルを使用したいと考えています。最も高いレベルのセキュリティを提供するモデルはどれですか？",
    "choices": [
      {
        "letter": "A",
        "text": "クラウドベース"
      },
      {
        "letter": "B",
        "text": "ピアツーピア"
      },
      {
        "letter": "C",
        "text": "オンプレミス"
      },
      {
        "letter": "D",
        "text": "ハイブリッド"
      }
    ],
    "answer": "A",
    "explanation": "",
    "type": "mc"
  }
];
