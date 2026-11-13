// src/pages/ScamVisualNews/components/DataSection.jsx
import { useState } from 'react';
import styles from '../styles/scam.module.css';
import FlourishEmbed from './FlourishEmbed';
import TinderGame from './TinderGame';
import PhoneSimulator from './PhoneSimulator';
import MetaTablet from './MetaTablet'; 

export default function DataSection() {
  const [modalImg, setModalImg] = useState(null);

  return (
    <div className="space-y-24 relative">
      
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

          {/* 圖表區塊 */}
          <div className="reveal-item w-full mt-12">
            <h4 className="text-xl font-bold font-sans text-[#FCE788] mb-8 text-center">年輕世代的受詐騙經驗調查</h4>

            {/* 受詐比例（左側翻轉圖片，右側文字說明） */}
            <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
              
              {/* 左側：翻轉卡片容器 */}
              <div className={styles.chartContainer}>
                <div 
                  className="relative w-full cursor-pointer perspective-1000 group"
                  onClick={(e) => {
                    const inner = e.currentTarget.querySelector('.flip-card-inner');
                    if (inner) inner.classList.toggle('rotate-y-180');
                  }}
                >
                  <div className="flip-card-inner relative w-full transition-transform duration-700 transform-style-3d">
                    
                    {/* 卡片正面：圖片與提示 */}
                    <div className="flip-card-front w-full backface-hidden relative">
                      <img 
                        src={`${import.meta.env.BASE_URL}resultone.png`} 
                        alt="問卷損失金額" 
                        className="max-w-full rounded-2xl shadow-lg border border-white/10 w-full hover:opacity-95 transition"
                      />
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs text-white border border-white/20 flex items-center gap-1 cursor-pointer"
                           onClick={(ev) => {
                             ev.stopPropagation();
                             setModalImg(`${import.meta.env.BASE_URL}resultone.png`);
                           }}>
                        🔍 放大觀賞
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-[#FCE788] border border-white/20">
                        🔄 點擊圖片看專家解說
                      </div>
                    </div>

                    {/* 卡片背面：林書立老師的引言 */}
                    <div className="flip-card-back absolute inset-0 w-full h-full bg-black/85 backdrop-blur-md p-6 rounded-2xl border border-[#FCE788]/30 flex flex-col justify-center items-center text-center rotate-y-180 backface-hidden">
                      <span className="text-[#FCE788] text-xs font-bold px-3 py-1 rounded-full mb-3 bg-[#FCE788]/10 border border-[#FCE788]/30">專家解說</span>
                      <p className="text-[#FCE788] text-base md:text-lg italic leading-relaxed mb-4">
                        「年輕族群本來就是被騙比較多的族群，只是年輕的族群，他們被騙的金額比較不是那麼高。」
                      </p>
                      <p className="text-white/60 text-xs">—— 銘傳大學犯罪防治學系助理教授 林書立</p>
                      <div className="mt-6 text-xs text-white/40">
                        🔄 再次點擊圖片翻回正面
                      </div>
                    </div>

                  </div>
                </div>

                {/* 圖說文字：置於圖片正下方 */}
                <p className="text-center text-xs text-[#BFBABF] mt-4 leading-relaxed">
                  資料來源：〈年輕世代的受詐騙經驗調查〉問卷調查、製圖／沈韋彤
                </p>
              </div>

              {/* 右側：文字說明 */}
              <div className="space-y-4 font-sans flex flex-col justify-center">
                <h5 className="text-xl font-bold text-[#FCE788] leading-snug">
                  在 152 位問卷填答者中，共有 32 位受詐騙並損失金錢，比例為 <span className="text-2xl text-white">21.1%</span>。
                </h5>
                <p className="text-white/95 text-base md:text-lg leading-relaxed">
                  而損失金額多小於十萬元。在警政署的網站中並未明確提及或定義「小金額詐騙」的金額區間，但從損失金額分布符合警政署對於 18 歲到 29 歲被詐受害人常遇到的「小額詐騙」型態。
                </p>
              </div>

            </div>

            {/* 網路購物詐騙 */}
            <div className="grid md:grid-cols-2 gap-8 items-start mb-16">
              <div className={styles.chartContainer}>
                <FlourishEmbed src="visualisation/29174577" type="hierarchy" />
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
              </div>
            </div>

            {/* 不報警成為黑數 */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className={styles.chartContainer}>
                <FlourishEmbed src="visualisation/29201265" type="hierarchy" />
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
        
        <div className="reveal-item chart-container w-full my-8 flex flex-col items-center">
          <div className="relative w-full flex flex-col items-center cursor-pointer group" onClick={() => setModalImg(`${import.meta.env.BASE_URL}scammoney.png`)}>
            <img 
              src={`${import.meta.env.BASE_URL}scammoney.png`} 
              alt="全國詐騙財產損失金額" 
              className="max-w-full rounded-2xl shadow-lg border border-white/10 hover:opacity-95 transition"
            />
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/20">
              🔍 點擊圖片放大觀賞
            </div>
          </div>
          <p className="text-center text-xs md:text-sm text-[#BFBABF] mt-4 leading-relaxed">
            資料來源：內政部警政署 165 打詐儀錶板，民國 113 年 8 月至 115 年 5 月全國詐騙財產損失金額（單位：億元）、製圖／孟沛蓁
          </p>
        </div>

        <p className="reveal-item text-white/95 text-lg leading-loose mb-6">
          民國 113 年 7 月立法院通過「打詐新四法」（以下簡稱新法）。根據內政部警政署「165 打詐儀錶板」數據顯示，新法上路前每月財損超過百億元，但自 114 年 1 月新法生效後，財損金額出現大幅下降。
        </p>

        {/* 詐騙演進圖表 */}
        <div className="reveal-item chart-container w-full my-8">
          <FlourishEmbed src="visualisation/29233681" type="gantt" />
          
          <div className="w-full flex justify-center my-8 cursor-pointer" onClick={() => setModalImg(`${import.meta.env.BASE_URL}timeline.png`)}>
            <div className="relative group">
              <img 
                src={`${import.meta.env.BASE_URL}timeline.png`} 
                alt="台灣詐騙演進時間軸" 
                className="max-w-full rounded-2xl shadow-lg hover:opacity-95 transition"
              />
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/20">
                🔍 點擊圖片放大觀賞
              </div>
            </div>
          </div>

          <p className="text-center text-xs md:text-sm text-[#BFBABF] mt-4 leading-relaxed mb-2">
            資料來源：王伯頎提供、製圖／孟沛蓁
          </p>
        </div>
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

        <div className="reveal-item w-full my-16">
          <MetaTablet />
        </div>

        <div className="reveal-item flex flex-col items-center justify-center w-full my-16 select-none">
          <PhoneSimulator />
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
      </section>

      {/* ============================================================
          燈箱彈跳視窗（全螢幕圖片放大檢視 Modal）
          ============================================================ */}
      {modalImg && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex justify-center items-center p-4 cursor-zoom-out"
          onClick={() => setModalImg(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute -top-12 right-0 text-white bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full text-sm font-bold transition border border-white/20"
              onClick={() => setModalImg(null)}
            >
              ✕ 關閉視窗
            </button>
            <img 
              src={modalImg} 
              alt="放大檢視" 
              className="max-w-full max-h-[82vh] object-contain rounded-2xl shadow-2xl border border-white/20 bg-black"
            />
            <p className="text-white/70 text-xs mt-4">提示：點擊任意空白處或右上角關閉按鈕即可退出放大檢視</p>
          </div>
        </div>
      )}

    </div>
  );
}
