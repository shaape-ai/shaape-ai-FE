import MenuBar from "./MenuBar";
import "./Summary.css";
import ChicCheckRating from "./chiccheckrating";
import PricePerformanceChart from "./PriceGraph";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL_PROD, API_URL_STAGE } from "../utils/utils";
import Tooltip from '@mui/material/Tooltip';

/**
 * MOCK DATA
 */
const mockData = {
    recommended_size: "?",
    occasion_check: {
      text: 'This outfit is perfect for a night out with friends!',
      emoji: '🥂'
    },
    userId: "7vhbmj867khugfghfgjhk",
    productUrl:"url",
    storeId: "7vhbmj867khugfghfgjhk",
    vibe_check: {
      score: 59,
      text: 'You are looking fabulous!'
    }
}




const SizeRecommendation = ({ onMenuClick, recommendedSize,sizeDescriptioin }: { onMenuClick: any, recommendedSize: string | null ,sizeDescriptioin:string}) => (
  <div className="size-recommendation" onClick={() => onMenuClick('findsize')}>
    <div className="size-box">{recommendedSize ?? '?'}</div>
    {
      recommendedSize?.length ? (
        <div className="size-info" 
        style={{
          marginLeft: '8px',
          textAlign: 'left',
        }}
        >
        <span>
          Your <b>Perfect Size</b> Would Be <b style={{fontWeight:"700"}}>{sizeDescriptioin}</b>
        </span>
        <div className="shop-link">Shopping For Someone Else?</div>
      </div>
      ) : (
        <div className="size-info underline cursor-pointer"
        style={{
            textDecoration: 'underline',
            marginLeft: '8px',
            textAlign: 'left',
          }}
        onClick={() => onMenuClick('findsize')}
        >
          <strong>Know Your Perfect Size</strong>
      </div>
      )
    }
    {
      recommendedSize != "?" ? (
        <Tooltip title="We recommend the best size for you by analyzing your input data and comparing it with the garment's sizing. Our recommendation ensures a fit that’s tailored just for you, so you can shop without any sizing doubts!">
        <div className="info-icon cursor-pointer" onClick={() => onMenuClick('findsize')}>?</div>

        </Tooltip>
      ): (
        <img
          src="./assests/Vector.svg"
          alt="back"
          className="w-4 h-4"
          onClick={() => onMenuClick('findsize')}
          style={{ marginTop: "5px" }}
        />
      )
    }
  </div>
);

const OutfitSuggestion = ({
  outfitText, emoji
}: {
  outfitText: string;
  emoji: string;
}) => (
  <div className="outfit-suggestion">
    <div className="icon-box">
      <span role="img" aria-label="party" className="icon">
        {emoji}
      </span>
    </div>
    <div className="suggestion-text" 
    style={{
      textAlign: 'left',
      marginLeft: '6px',
    }}
    >
      <span>
        {
          outfitText
        }
      </span>
    </div>
  </div>
);

const Summary = ({ onMenuClick }: { onMenuClick: any }) => {

  // 
  const [sizeDesc, setSizeDesc] = useState("");
  const [productData, setProductData] = useState({
    description: '',
    color: '',
    title: '',
    url: '',
    storeId: ''
  });
  
  const [response, setResponse] = useState() as any;
  const [prices, setPrices] = useState({
    labels: [],
    data:[],
  });
  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.data.type === 'DATA_FROM_CONTENT_SCRIPT') {
        const { description, color, title, url, storeId } = event.data.payload;
        setProductData({ description, color, title, url, storeId });
      }
    };

    window.addEventListener('message', handleMessage);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('message', handleMessage);
    
  }, []);

  const fetchSummaryData = async () => {
    try {
      const localData = await chrome.storage.local.get() ?? {};

      const payload = {
        user_id: localData?.uuid,
        size_info: {
          height: localData?.user_size?.height,
          weight: localData?.user_size?.weight,
          body_shape: localData?.user_size?.body_shape,
          age: localData?.user_size?.age,
        },
        product: {
          ...localData?.product,
        },
        preferences: null
      };

      if(localData?.preference){
        payload.preferences = localData?.preference;
      }

      await apiCall(payload)
    } catch (error) {
      console.log('error: ', error);
    }
  };
  const priceApiCall =  async() => {
    chrome.storage.local.get(["product"], async function (result) {
      if (result["product"]) {
        const storeId = result["product"]?.["storeId"];
        const url = result["product"]?.["url"];
        const reqObj = {
          store_id : storeId,
          url: url
        }
        const res = await axios.post(`${API_URL_PROD}/get_price_performance`,reqObj);
        console.log("prices res",res);

        if(res?.data){

          console.log("price data", res.data);
          const dayValues:string[] = [], dataValues:string[] = [];
          const days = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat']
          res.data.map((value:any)=>{
            const day = days[(new Date(value.created_at)).getDay()];
            dayValues.push(day)
            dataValues.push(value.price)
          })
          const response = {
            data: dataValues,
            labels: dayValues,
          }
          setPrices(response as any);
        }
      } 
    });

   

  }
  const apiCall = async (payload: any) => {
    try {
      chrome.storage.local.set(
        {
          payload: payload,
        },
        function () {
          console.log("Bot message added successfully");
        }
      );
      const Res = await axios.post(
        `${API_URL_PROD}/overview`,
        payload
      );

      chrome.storage.local.set(
        {
          summary_data: Res,
        },
        function () {
          console.log("Bot message added successfully");
        }
      );
      if(Res?.data){
        setResponse(Res.data);
        switch(Res.data?.size_recommendation?.recommended_size){
          case "S":{
            setSizeDesc("Small");
            break;
          }
          case "M":{
            setSizeDesc("Medium");
            break;
          }
          case "L" :{
            setSizeDesc("Large");
            break;
          }
          case "XL":{
            setSizeDesc("Extra Large");
            break;
          }
          case "XXL":{
            setSizeDesc("Double Extra Large");
            break;
          }
          case "XS":{
            setSizeDesc("Extra Small");
            break;
          }
        }
      }

    } catch(err){
      console.log('err: ', err);

      chrome.storage.local.set(
        {
          summary_data_error: err,
        },
        function () {
          console.log("Bot message added successfully");
        }
      );
    }
  }

  useEffect(() => {
    fetchSummaryData();
    priceApiCall();
  }, []);
  console.log("VibeCheck: ", response == null );
  
  return (
    <div>
    <SizeRecommendation onMenuClick={onMenuClick} recommendedSize={
      response?.size_recommendation?.recommended_size ?? mockData?.recommended_size
    } sizeDescriptioin={sizeDesc} />
    {
      mockData.occasion_check.text.length ? (
        <OutfitSuggestion
          outfitText={
            response?.occasion_copy ?? mockData.occasion_check.text
          }
          emoji={response?.product?.occasion_copy_emoji ?? mockData.occasion_check.emoji}
        />
      ) : null
    }
    <ChicCheckRating rating={
      response == null ? 0 : response?.vibeCheck 
    } 
    text={
      response?.vibecheck_copy ?? mockData.vibe_check.text
    }
    />
    <PricePerformanceChart prices={prices}/>
  </div>
  )
};
export default Summary;
