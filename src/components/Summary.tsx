import MenuBar from "./MenuBar";
import "./Summary.css";
import ChicCheckRating from "./chiccheckrating";
import PricePerformanceChart from "./PriceGraph";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/utils";


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




const SizeRecommendation = ({ onMenuClick, recommendedSize }: { onMenuClick: any, recommendedSize: string | null }) => (
  <div className="size-recommendation">
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
          Your <b>Perfect Size</b> Would Be <b>{recommendedSize}</b>
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
      recommendedSize?.length ? (
        <div className="info-icon cursor-pointer"  onClick={() => onMenuClick('findsize')}>i</div>
      ) : (
        <div className="info-icon cursor-pointer" onClick={() => onMenuClick('findsize')}>?</div>
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

  const [productData, setProductData] = useState({
    description: '',
    color: '',
    title: '',
    url: '',
    storeId: ''
  });
  
  const [response, setResponse] = useState() as any;

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
      const response = await axios.post(
        `${API_URL}/overview`,
        payload
      );

      chrome.storage.local.set(
        {
          summary_data: response,
        },
        function () {
          console.log("Bot message added successfully");
        }
      );
      if(response?.data){
        setResponse(response.data);
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
  }, []);

  
  return (
    <div>
    <SizeRecommendation onMenuClick={onMenuClick} recommendedSize={
      response?.size_recommendation?.recommended_size ?? mockData?.recommended_size
    } />
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
      response?.vibeCheck !== null ? response?.vibeCheck : mockData.vibe_check.score
    } 
    text={
      response?.vibecheck_copy ?? mockData.vibe_check.text
    }
    />
    <PricePerformanceChart />
  </div>
  )
};
export default Summary;
