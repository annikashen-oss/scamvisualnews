// src/pages/ScamVisualNews/components/DataSection.jsx
import { useEffect } from 'react';
import styles from '../styles/scam.module.css';
import TinderGame from './TinderGame';
import PhoneSimulator from './PhoneSimulator';
import MetaTablet from './MetaTablet'; 

export default function DataSection() {
  // 🎯 強化版：動態載入腳本並強制觸發 Flourish 渲染
  useEffect(() => {
    // 檢查是否已經載入過，避免重複插入
    let script = document.querySelector('script[src="https://public.flourish.studio/resources/embed.js"]');
    
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://public.flourish.studio/resources/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // 當腳本載入後，強制調用 Flourish 的繪製方法
    const timer = setTimeout(() => {
      if (window.Flourish && typeof window.Flourish.embed === 'function') {
        window.Flourish.embed();
      }
    }, 500); // 給予 0.5 秒確保 DOM 已經生成

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-24">
      
      {/* ============================================================
          面向一：18歲到29歲成詐騙最大被害族群
          ============================================================ */}
      <section className="flex flex-col justify-center items-center p-6 pb-24 relative">
        <div className="relative w-full max-w-4xl p-6 md:p-10 z-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">

          <h3 className="reveal-item text-2xl md:text-3xl font-bold font-sans text-white mb-6 border-l-4 border-[#FCE788] pl-4 leading-tight">
            18歲到29歲成詐騙最大被害族群
          </h3>

          <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
            大專院校學生，每年每十萬名就有 <span className="text-[#FCE788] font-bold">58 人</span> 受騙。民國 114 年內政部警政署統計，18 至 29 歲的被害人佔比最多，每三名受害者中，就有一名是該年齡區間的年輕人。儘管政府持續推動打擊詐騙的政策和法律，但過去四年，各級學校通報屬於詐騙的校安事件，例如學生在網路進行二手交易時上當受騙的數量，仍逐年上升。
          </p>

          <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
            根據 113 學年度的各級學校校園安全及災害事件分析報告顯示，大專院校的受騙人數和件數最多，共計 <span className="text-[#FCE788] font-bold">558 件、653 人次</span>，佔總共受詐通報案件的 <span className="text-[#FCE788] font-bold">67%</span>。
          </p>

          {/* 小標 A */}
          <h4 className="reveal-item text-xl font-bold font-sans text-[#FCE788] mt-12 mb-6 border-b border-[#FCE788]/30 pb-3">
            學生與成年人的受騙類型有何不同
          </h4>

          <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
            Alice（化名）是一名曾在網路上受騙於演唱會門票的大學生，為了能在演唱會上以更好的視野欣賞偶像的舞台，Alice 回覆社群媒體中原價讓票的貼文，並且與對方相約面交門票，並先匯款一半的訂金，最後對方並未如期赴約，Alice 驚覺受騙後才至派出所報案。像這樣的案例，如今在年輕社群裡屢見不鮮。根據刑事局 114 年最新統計，全台詐騙版圖已悄悄洗牌，「<span className="text-[#FCE788] font-bold">假網路拍賣</span>」的案件數已正式超越過去居冠的「投資詐欺」。
          </p>

          <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
            這波網購詐騙潮，首當其衝的正是 23 歲以下的年輕族群，相較於 24 歲以上成年人擁有一定積蓄，最常落入「投資詐欺」陷阱。儘管網購詐騙的單筆財損金額較低，但受害人數眾多，仍對整體社會造成不容忽視的危害。
          </p>

          <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
            根據財團法人台灣網路資訊中心調查，114 年 18-29 歲為社群媒體使用率最高的族群，多達 <span className="text-[#FCE788] font-bold">98.02%</span>。從犯罪學理論出發，詐騙案件通常具備「具動機的犯罪者」、「合適的被害目標」以及「缺乏監護的環境」三個條件。銘傳大學犯罪防治學系副教授王伯頎強調，年輕族群身為「數位原住民」，相較於過往實體面對面或聲音的傳統詐騙，這群人對網路信任度更高、黏著時間更長，因此更容易落入數位詐騙陷阱，加上法規對個人隱私的保護，網路世界的私人聊天室缺乏監管，使其遇上詐騙的風險提高。
          </p>

          {/* 小百科：生活暴露理論 + 日常活動理論 */}
          <div className={`reveal-item ${styles.encyclopediaBlock} p-6 my-8 shadow-lg relative overflow-hidden font-sans`}>
            <span className="inline-block bg-[#FCE788] text-black text-sm font-bold px-3 py-1 rounded-full mb-3">🔍 小百科</span>
            <div className="space-y-4 text-white/90 leading-relaxed">
              <div>
                <span className="font-bold text-[#FCE788]">生活暴露理論：</span>
                犯罪被害的發生具有非隨機性，其核心取決於個人的日常行為模式。當個體在職場、校園或娛樂場所中，展現出特定的生活形態時，將會提高其置身危險環境的頻率，並增加與潛在犯罪者交會的機率。
              </div>
              <div>
                <span className="font-bold text-[#FCE788]">日常活動理論：</span>
                犯罪行為的實踐未必取決於深層的加害動機，而是環境情境互動的結果。當「具備誘因的標的物」、「具犯罪意圖者」以及「有效防護機制的缺失」這三項核心制約變項，在特定的時間與空間產生交會時，犯罪便隨之觸發。
              </div>
              <div className="text-xs text-white/50 mt-2">
                來源自賴克宗 (2005)，《大學生網路犯罪被害研究》、廖釗頡 (2010)，《網路釣魚被害類型及其成因》、方呈祥(2020)《網路詐欺犯罪被害之性別差異—以網路日常活動與自我控制理論分析》
              </div>
            </div>
          </div>

          {/* 小標 B */}
          <h4 className="reveal-item text-xl font-bold font-sans text-[#FCE788] mt-12 mb-6 border-b border-[#FCE788]/30 pb-3">
            受騙後的心理狀態影響年輕人是否採取報警行動
          </h4>

          <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
            王伯頎受訪時提到，詐騙集團尤其看準年輕人受騙後，因金額小而不選擇報警的心態，將狩獵目標轉向年輕人。記者透過問卷資料，結合心理學的「自我控制理論」深入探討，究竟有哪些原因，讓年輕人成為詐騙集團眼中的潛在肥羊。
          </p>

          <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
            根據記者收到的 152 份問卷中，實際曾受騙的人數為 32 人，其中有 16 人實際報警；未曾受騙人數為 120 人，其中有 101 人預期自己受騙後將會報警。以卡方獨立性檢定 (Chi-square test of independence) 來討論「尚未被騙的人預期自己會報警的比例」與「真正被騙的人實際去報警的比例」是否存在顯著差異，結果顯示 <span className="text-[#FCE788] font-bold">p-value = 0.00012</span>，遠小於 0.05 的顯著水準，代表「預期行為」與「實際行為」有顯著的統計差異。高達八成的年輕人認為自己被騙後會去報警，但真正在現實中受騙的群體，實際報警的比例卻只有五成。
          </p>

          <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
            根據自我控制理論，年輕人受騙後因低自我控制特質，傾向逃避當下面對丟臉與報警程序的短期痛苦，當初因衝動冒險而受騙，事後寧可選擇隱瞞以獲得即時的心理解脫。而鏡中自我理論與印象整飾理論也提到，受騙後的恥辱以及可能被貼上「愚蠢」、「社會經驗不足」等負面標籤，使得年輕人不願報警。從理論與統計分析中「實際報警行為」和「預期報警行為」的比例差異可以推測，實際受騙後產生的心理狀態，比起金額大小，更加影響年輕人是否報警。
          </p>

          {/* 小百科：自我控制理論、印象整飾理論、鏡中自我理論 */}
          <div className={`reveal-item ${styles.encyclopediaBlock} p-6 my-8 shadow-lg relative overflow-hidden font-sans`}>
            <span className="inline-block bg-[#FCE788] text-black text-sm font-bold px-3 py-1 rounded-full mb-3">🔍 小百科</span>
            <div className="space-y-4 text-white/90 leading-relaxed">
              <div>
                <span className="font-bold text-[#FCE788]">自我控制理論：</span>
                違法與偏差行為的根源，應歸咎於個體自我控制機制的匱乏。此類低自我控制特質的關鍵核心，在於個體高度沉溺於即時性的感官滿足與短期利益，因而喪失了對該行為衍生之長期負面代價與遲滯性後果的審慎評估能力。
              </div>
              <div>
                <span className="font-bold text-[#FCE788]">印象整飾理論：</span>
                人際互動本質上具備劇場展演的特性。個體在社會情境中皆扮演著特定角色，並透過口頭論述、服飾裝飾及肢體語彙等媒介，有意識地篩選與操控所傳遞的訊息，藉此干預並重塑外界對其個人形象的認知。
              </div>
              <div>
                <span className="font-bold text-[#FCE788]">鏡中自我理論：</span>
                個體的自我概念與主觀認知，乃是透過社會互動的動態歷程而建構。在人際交往中，他者的反饋扮演著鏡像媒介的角色，映射出個體的社會形象，進而形塑其自我認同的內涵。
              </div>
              <div className="text-xs text-white/50 mt-2">
                來源自方呈祥(2020)《網路詐欺犯罪被害之性別差異—以網路日常活動與自我控制理論分析》
              </div>
            </div>
          </div>

          {/* 搶票測驗 */}
          <div className="reveal-item w-full bg-black/30 rounded-2xl p-8 border border-white/10 text-center my-12">
            <h5 className="text-xl font-bold text-[#FCE788] mb-4">🎫搶票大作戰 </h5>
            <TinderGame />
          </div>

          {/* 小標 C */}
          <h4 className="reveal-item text-xl font-bold font-sans text-[#FCE788] mt-12 mb-6 border-b border-[#FCE788]/30 pb-3">
            年輕人是否容易被詐騙，人格特質其實有跡可循
          </h4>

          <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
            過去曾有 ATM 轉帳詐欺犯罪之實證研究結果顯示，「過度自信」、「執迷不悟」、「容易相信表面」等人格特質，較容易上當受騙。Linda Melody Alvese（2006）也曾在相關詐騙研究中提到，喜好孤獨與不擅長社交的人格特質容易落入詐騙陷阱。
          </p>

          <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
            在問卷調查中，記者針對人際信任度、自我認知（過度自信）、認知僵化（沉沒成本）、風險感知（樂觀偏差）、人際支持網絡、以及訊息查證行為，對 32 位有受騙經驗的填答者進行人格特質分析。我們將受害者分為「主要在社群媒體受騙 (n=20)」與「在其他管道受騙 (n=12)」，比較兩組的特質，進行曼-惠特尼 U 檢定 (Mann-Whitney U Test)。
          </p>

          <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
            檢定結果顯示，在「他者認知」與「訊息辨識與查證」兩個向度皆達統計顯著水準。這顯示出，容易在社群媒體上受騙的年輕人，具備兩種特質：第一是較高的認知僵化與沉沒成本謬誤，一旦相信某個粉專或賣家，就很難改變想法，即便有疑慮也不願放棄。第二是較差的訊息查證習慣，特別容易受到時間壓力（如：社群上的「限時搶購」、「最後名額」）影響而放棄查證。
          </p>

          {/* 圖表區塊（保留 Flourish 嵌入） */}
          <div className="reveal-item w-full mt-12">
            <h4 className="text-xl font-bold font-sans text-[#FCE788] mb-8 text-center">年輕世代的受詐騙經驗調查</h4>

            {/* 受詐比例 */}
            <div className="grid md:grid-cols-2 gap-8 items-start mb-16">
              <div className={styles.chartContainer}>
                <div className="flourish-embed flourish-parliament" data-src="visualisation/29255072"></div>
                <p className="text-center text-xs text-[#BFBABF] mt-4 leading-relaxed">
                  資料來源：〈年輕世代的受詐騙經驗調查〉問卷調查、製圖／沈韋彤
                </p>
              </div>
              <div className="space-y-4 font-sans">
                <h5 className="text-lg font-bold text-[#FCE788]">
                  在 152 位問卷填答者中，共有 32 位受詐騙並損失金錢，比例為 <span className="text-2xl">21.1%</span>。
                </h5>
                <p className="text-white/90 text-base leading-relaxed">
                  而損失金額多小於十萬元。在警政署的網站中並未明確提及或定義「小金額詐騙」的金額區間，但從損失金額分布符合警政署對於 18 歲到 29 歲被詐受害人常遇到的「小額詐騙」型態。
                </p>
                <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-[#FCE788]/80 text-sm italic">
                    「年輕族群本來就是被騙比較多的族群，只是年輕的族群，他們被騙的金額比較不是那麼高。」
                  </p>
                  <p className="text-white/50 text-xs mt-2">—— 銘傳大學犯罪防治學系助理教授 林書立</p>
                </div>
              </div>
            </div>

            {/* 網路購物詐騙 */}
            <div className="grid md:grid-cols-2 gap-8 items-start mb-16">
              <div className={styles.chartContainer}>
                <div className="flourish-embed flourish-hierarchy" data-src="visualisation/29174577"></div>
                <p className="text-center text-xs text-[#BFBABF] mt-4 leading-relaxed">
                  資料來源：〈年輕世代的受詐騙經驗調查〉問卷調查、製圖／沈韋彤
                </p>
              </div>
              <div className="space-y-4 font-sans">
                <h5 className="text-lg font-bold text-[#FCE788]">
                  網路購物詐騙最常見，主要發生在社群媒體交易
                </h5>
                <p className="text-white/90 text-base leading-relaxed">
                  林書立說明：「大部分的年輕族群過去遇到購物詐欺比較多，因為政府對於陌生帳號的轉帳有限制在 10 萬元以內。」這也解釋小額詐騙和網路購物的連結，圖表中詐騙類型也多屬於網路購物，但詐騙發生的地點多聚集在社群媒體平台，並高於網路與直接購物商家的平台，透露出社群媒體上有更多的交易風險。
                </p>
                <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-[#FCE788]/80 text-sm italic">
                    社群媒體上的詐騙通常會延伸到私人聊天室。「在大海中遇到了你，他把這個水撈到小池塘來，只有點對點、你跟他」，若在平台上，政府有權管控或追責，一旦詐騙者將你拉進私密的通訊軟體，政府的手便無法介入。
                  </p>
                  <p className="text-white/50 text-xs mt-2">—— 銘傳大學犯罪防治學系助理教授 林書立</p>
                </div>
                <div className="mt-3 p-3 bg-[#FCE788]/5 border border-[#FCE788]/20 rounded-lg">
                  <p className="text-xs text-white/70 leading-relaxed">
                    <span className="text-[#FCE788] font-bold">📘 小百科：</span>
                    警政署統計的受詐騙類型分為九種，投資詐欺、假網路拍賣(購物)、一般購物詐欺(偽稱買賣)、假愛情交友、解除分期付款(ATM)、色情應召詐財、假求職、假冒機構(公務員)、其他。本調查和警政署統計稍有不同，但會著重在假網路拍賣(購物)、一般購物詐欺(偽稱買賣)以及和銀行相關的詐騙類型，如：盜刷信用卡。
                  </p>
                </div>
              </div>
            </div>

            {/* 不報警成為黑數 */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className={styles.chartContainer}>
                <div className="flourish-embed flourish-hierarchy" data-src="visualisation/29201265"></div>
                <p className="text-center text-xs text-[#BFBABF] mt-4 leading-relaxed">
                  資料來源：〈年輕世代的受詐騙經驗調查〉問卷調查、製圖／沈韋彤
                </p>
              </div>
              <div className="space-y-4 font-sans">
                <h5 className="text-lg font-bold text-[#FCE788]">
                  不願意報警成為年輕受詐統計最大詐騙黑數
                </h5>
                <p className="text-white/90 text-base leading-relaxed">
                  在 28 位受詐騙者中（此處為問卷中實際損失金錢者），有 16 位選擇報警，其中僅有 4 位完全追回損失金額。受到詐騙後的報警率僅有半數。
                </p>
                <p className="text-white/80 text-base leading-relaxed">
                  在攸關是否追回損失的問題上，從受騙到採取報警行動的時間，出現一天內和三天內的兩種分布的情形，且大部分都導向未追回損失的結果。
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================
          面向二：詐騙變動快 被騙金額在政策打詐後持續下降
          ============================================================ */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h3 className="reveal-item text-2xl md:text-3xl font-bold font-sans text-white mb-8 border-l-4 border-[#FCE788] pl-4 leading-tight">
          詐騙變動快 被騙金額在政策打詐後持續下降
        </h3>

        <div className="reveal-item chart-container w-full my-8">
          <div className="flourish-embed flourish-chart" data-src="visualisation/29175490"></div>
          <p className="text-center text-xs md:text-sm text-[#BFBABF] mt-4 leading-relaxed">
            資料來源：內政部警政署 165 打詐儀錶板，民國 113 年 8 月至 115 年 5 月全國詐騙財產損失金額（單位：億元）、製圖／孟沛蓁
          </p>
        </div>

        <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
          民國 113 年 7 月立法院通過「打詐新四法」（以下簡稱新法）。根據內政部警政署「165 打詐儀錶板」數據顯示，新法上路前每月財損超過百億元，但自 114 年 1 月新法生效後，財損金額出現大幅下降。
        </p>

        <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
          然而，這波降幅並未持續太久。3 月至 6 月是傳統的詐騙旺季，此時不僅有年終發放後的投資收網、報稅季節，還碰上畢業求職潮，讓詐騙集團乘勢調整手法，捲土重來。與此同時，由於新法剛上路，檢警、金融機構與數位平台仍在磨合防詐通報機制，無法在第一時間攔阻這些新型態詐騙，該期間的財損金額因而出現微幅回升。不過，隨著各部會與民間企業完成系統對接，攔阻機制也全面步上軌道，成功讓去年下半年財損金額穩定下滑。
        </p>

        <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
          雖然新法實施後，整體詐騙財損似乎已有效降低，但銘傳大學犯罪防治學系副教授王伯頎卻指出另一個問題，有愈來愈多未滿 18 歲的青少年，因聽信詐騙集團「年少觸法不會留案底」的說法，被吸收成為車手而誤入歧途。林書立也提到，年輕族群主要受詐的範圍從網路購物與遊戲軟體交易，開始逐步出現針對大學生的「貸款詐騙」，利用手機螢幕小、合約冗長等特點，誘騙學生草率完成電子簽名，並將高額利息包裝成「設定費、違約金」等名目規避重利罪，甚至還會扣留學生身分證與帳戶，偷偷申請大額貸款，讓毫無防備的學生背負巨額債務。
        </p>

        {/* 小百科：打詐新四法 */}
        <div className={`reveal-item ${styles.encyclopediaBlock} p-6 my-8 shadow-lg relative overflow-hidden font-sans`}>
          <span className="inline-block bg-[#FCE788] text-black text-sm font-bold px-3 py-1 rounded-full mb-3">🔍 小百科</span>
          <p className="text-white/90 leading-relaxed">
            打詐新四法為：《詐欺犯罪危害防制條例》、《通訊保障及監察法》、《刑事訴訟法特殊強制處分專章》（科技偵查法制化）以及《洗錢防制法》。
          </p>
        </div>

        {/* 詐騙演進圖表 */}
        <div className="reveal-item chart-container w-full my-8">
          <div className="flourish-embed flourish-gantt" data-src="visualisation/29233681"></div>
          <p className="text-center text-xs md:text-sm text-[#BFBABF] mt-4 leading-relaxed mb-2">
            資料來源：王伯頎提供、製圖／孟沛蓁
          </p>
        </div>

        <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
          王伯頎將詐騙演進分為四階段，分別是傳統詐騙、電信詐騙、網路詐騙、數位詐騙。王伯頎指出年輕族群受騙人數增加，主因在於他們身為「數位原住民」，相較於過往實體面對面或聲音的傳統詐騙，這群人對網路信任度更高、黏著時間更長，因此更容易落入數位詐騙陷阱。
        </p>

        <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
          林書立也提到「年輕族群本來就是被騙比較多的，只是被騙的金額比較不是那麼高。」近年來，林書立也發現年輕族群主要受詐的範圍從網路購物與遊戲軟體交易，開始逐步出現貸款詐騙，預示未來他們可能暴露在更高的風險中。
        </p>
      </section>

      {/* ============================================================
          面向三：社群媒體詐騙難防 新型手法政府應對仍受限
          ============================================================ */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="reveal-item flex items-center mb-10">
          <div className="w-2 h-8 bg-[#FCE788] mr-4 shadow-[0_0_8px_rgba(252,231,136,0.6)]"></div>
          <h3 className="text-2xl md:text-3xl font-bold font-sans text-white leading-tight">
            社群媒體詐騙難防 新型手法政府應對仍受限
          </h3>
        </div>

        <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
          主打真實、給予觀眾滿滿情緒價值的創作者「解壓」，頻道特色以校園、旅遊為主。因為經常從事中國與臺灣之間的代購業務，他平日裡有頻繁且龐大的換匯需求——然而，這項看似平常的業務，也讓詐騙集團有機可趁。
        </p>

        <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
          一次偶然的機會，詐騙者透過假帳號主動與他接觸，給出了低於市場手續費、看似合理的匯率。預計換匯六萬元台幣的解壓，先是匯了三萬元台幣後，對方傳送了一張內容為一萬三千元的人民幣匯入解壓的廈門銀行戶頭的截圖，並提到兩個小時後才會到帳。解壓看見截圖卸下心防後，對方提到還有其他人正在跟他換台幣，希望解壓前再次匯款三萬元，直到兩個小時後依然等不到人民幣入帳，才驚覺受騙，最終損失了新臺幣 6 萬元。
        </p>

        <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
          「當下腦袋是一片空白。」解壓回憶，發覺被騙的那一刻已是凌晨兩、三點。他做的第一件事是連夜將自己受騙的過程剪輯成警示影片，直到隔天下午，他才前往警局報案。進了派出所，員警表示依法僅能先凍結帳戶。解壓無奈地說，警方並未提供更積極的解決管道：「當下真的很無助，如果對方轉出帳戶的話，基本上就是拿不回來了，因為錢很可能已經被洗掉了。」
        </p>

        <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
          近期 Threads 詐騙頻傳，解壓也是在該平台落入陷阱。事後回想，他觀察到詐騙者會塑造特定人設，以取信他人。加上 Threads 的演算法會主動推播陌生貼文，且在留言與回覆之間幾乎沒有門檻，這種高互動的平台特性，更容易讓人放低防備。林書立解釋如 Threads、X 等快社群的特性，更容易主動推送詐騙訊息給使用者，並且使用聳動的語句，吸引大家的注意力，讓人防不勝防。
        </p>

        <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
          林書立表示，新法的規範對象已涵蓋電商與社群平台，目前 Meta 及 LINE 皆須配合政府，下架詐騙廣告，違者政府依法有權開罰。不過他也指出，社群媒體聲稱基於保護用戶隱私考量，鮮少提供個人資料，詐團即是看準這點，會避免在平台上直接詐騙，而是先利用平台互動，再將受害者引導至私人的通訊軟體進行詐騙。
        </p>

        <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
          對此，林書立認為除了現行打詐新四法，應參考國際制定「線上安全法」，從源頭要求平台承擔管理責任，強化資訊揭露與風險控管機制，才能真正堵住隱私保護底下的漏洞。
        </p>

        {/* 小百科：快社群、線上安全法 */}
        <div className={`reveal-item ${styles.encyclopediaBlock} p-6 my-8 shadow-lg relative overflow-hidden font-sans`}>
          <span className="inline-block bg-[#FCE788] text-black text-sm font-bold px-3 py-1 rounded-full mb-3">🔍 小百科</span>
          <div className="space-y-4 text-white/90 leading-relaxed">
            <div>
              <span className="font-bold text-[#FCE788]">快社群：</span>
              快社群意指在移動網絡結構與智能算法深度演進的背景下，一種以「高產出速率、資訊碎片化、即時交互反饋，以及內容快速更迭汰換」為核心屬性的新型態網絡社交媒介現象。
            </div>
            <div>
              <span className="font-bold text-[#FCE788]">線上安全法：</span>
              強化對大型網路科技公司的監管，強制平台履行主動審查與限時下架違法內容的「法定義務」，若有違規將祭出天價罰款，最高可處以該公司全球總營業額 6% 至 10% 的罰金，針對情節嚴重且惡意不配合者，政府將直接追究高階主管的刑事連帶責任使其面臨坐牢處分，最後則強制演算法透明化，要求平台公開推薦機制並接受第三方原始碼審計。多國已陸續發布相關法案，如英國、澳洲等。
            </div>
          </div>
        </div>

        {/* Meta 平板動畫組件*/}
        <div className="reveal-item w-full my-16">
          <MetaTablet />
        </div>

        {/* 165 模擬器 + 說明文字 */}
        <div className="reveal-item flex flex-col items-center justify-center w-full my-16 select-none">
          <div className="text-center mb-6 z-10">
            <h4 className="text-2xl md:text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-[#FCE788]">
              📞 防詐騙安全挑戰
            </h4>
            <p className="text-sm text-white/70 mt-2 transition-all duration-300">
              你能找出正確的「反詐騙專線」並成功撥打嗎？
            </p>
          </div>
          <PhoneSimulator />
          <div className="mt-8 max-w-2xl text-center text-white/90 text-base leading-relaxed">
            <p className="mb-4">
              165 反詐騙諮詢專線在打詐中扮演重要角色，並非只是協助民眾報案。林書立指出，165 專線主要能從三個面向協助民眾：
            </p>
            <ul className="list-disc list-inside text-left space-y-2 text-white/80">
              <li><span className="font-bold text-[#FCE788]">即時圈存：</span>當民眾察覺自己「可能」受騙時，即可撥打專線，工作人員會協助通報並啟動圈存、凍結款項程序，避免在前往警局報案的過程錯失黃金時間。</li>
              <li><span className="font-bold text-[#FCE788]">掌握詐騙趨勢：</span>民眾來電的自述也能協助警方掌握詐騙趨勢，得以整理出最新詐騙模式，以此警示民眾。</li>
              <li><span className="font-bold text-[#FCE788]">後續程序指引：</span>向受害者說明後續處理程序，包括報案、製作筆錄及相關法律流程等，協助民眾了解接下來應採取的行動。</li>
            </ul>
            <p className="mt-4 text-sm text-white/60 italic">
              （註：有受訪者表示對受騙者而言，打 165 只是會被轉接到派出所報案，他們自己去報警就好了。然而對政府而言，165 會有後台紀錄，也會同時通報警方或銀行，嘗試阻止款項移出，但這部分民眾較無感，因為大多是在錢已經轉出後才撥打。）
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          面向四：詐騙撕裂社會 秉持網路零信任面對
          ============================================================ */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="reveal-item flex items-center mb-10">
          <div className="w-2 h-8 bg-[#FCE788] mr-4 shadow-[0_0_8px_rgba(252,231,136,0.6)]"></div>
          <h3 className="text-2xl md:text-3xl font-bold font-sans text-white leading-tight">
            詐騙撕裂社會 秉持網路零信任面對
          </h3>
        </div>

        <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
          如今網路與行動裝置普及的時代，詐團與受害者不僅透過建立一對一關係進行頻繁交流，還利用多人群組形成同溫層，獲取受害者的信任。林書立分享犯罪心理學家的觀察，認為台灣人容易被騙是受到教育長期的影響，「我們從小是受儒家的教育，就是溫馴、要相信人。」因此他提倡「<span className="text-[#FCE788] font-bold">網路零信任</span>」。面對網路交友需秉持謹慎的態度，以免受到傷害，甚至因社會眼光與自尊心受創，而選擇獨自承受。「很多受害者只敢把這些受創的過程埋在自己的心裡，不敢講出來，這也是另外一個隱憂。」
        </p>

        <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
          「（讓受害者）有一個出口分享自己也是曾經被詐騙的人，經歷這些事後都有所成長，對於任何金錢上的流出也會更警惕。」彥儒提及自己公開受詐騙經驗，便是為了鼓勵同樣受騙的人說出自身經歷，除了減輕心理壓力外，也能警醒大眾。他分享在受騙後，雖不會影響使用交友軟體的意願，但在實際見面之前，他一律會先把對方當成假人，將風險降到最低。他認為，在從事網路行為時若有所疑慮，先跟親友聊一聊會有所幫助，「（如果）有一個朋友可以討論，往往那個朋友就會把你拉回來。」
        </p>

        <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
          道高一尺魔高一丈，詐騙手法日新月異，政府措施與保護即使有所跟進，但也時常力有未逮。因此詐騙防治除了依賴公權力外，更多應該回歸到個人，「必須要有一些自保的能力，就是所謂的防詐意識。」王伯頎認為要提升防詐意識，不只需要繼續在教育向下扎根，培養學童對詐騙的敏感度，大眾也應該要多主動接觸新聞、學習新知，並且保持不懂就問的態度，為自己注入「防詐疫苗」。
        </p>
      </section>

    </div>
  );
}
