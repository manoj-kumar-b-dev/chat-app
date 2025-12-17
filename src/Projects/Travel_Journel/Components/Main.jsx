import Header from "./Header"

export default function Main()
{
    return ( 
      <>
        <div className="container" >
          <div>
            <img className="place-pic" src='./Images/pic2.jpg' alt="" />
          </div>
          <div className="description-container">
            <h2 className="text-xl font-medium">
              5 viral infections including Dengue, Influenza A rising fast across India: ICMR report
            </h2>
            <p>
              India has seen a concerning rise in infectious diseases this year, according to new data from the Indian Council of Medical Research (ICMR). The latest report from ICMR’s Virus Research and Diagnostic Laboratories (VRDL) network found that pathogens were detected in 11.1 per cent of the 4.5 lakh patients tested across the country between January and June 2025.
            </p>
            <a href="https://www.financialexpress.com/life/health/5-viral-infections-including-dengue-influenza-a-rising-fast-across-india-icmr-report/4030603/lite/">
              <button className="explore-button">Explore</button>
            </a>
          </div>
        </div> 
        <div className="container" >
          <div>
            <img className="place-pic" src='./Images/pic1.jpg' alt="" />
          </div>
          <div className="description-container">
            <h2 className="text-xl font-medium">
              Apple likely to unveil gen AI Siri with custom Gemini model in March 2026
            </h2>
            <p>
              In June 2024, at the annual World Wide Developers Conference (WWDC), Apple revealed its grand plan of bringing a generative Artificial Intelligence (gen AI)-powered all-new smart Siri assistant. Due to software bugs, it got pushed to 2025.
              It will be a custom Gemini AI model that can work on Apple's secure Private Cloud Compute server and meet its stringent user privacy policy.
            </p>
            <a href="https://www.deccanherald.com/technology/artificial-intelligence/apple-likely-to-unveil-gen-ai-siri-with-custom-gemini-model-in-march-2026-report-3784843">
              <button className="explore-button">Explore</button>
            </a>
          </div>
        </div> 
      </>
      
      

  )
}