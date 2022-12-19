import { useState, useEffect } from "react";
import { MapMarker, Map } from "react-kakao-maps-sdk";

const { kakao } = window;
const MapComp = () => {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    
    // Geolocation을 이용해 자기 위치 찾기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // GeoLocation을 사용할 수 없을때 마커 표시위치와 인포윈도우 내용을 설정
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없음",
        isLoading: false,
      }));
    }
    // ps.keywordSearch("이태원 맛집", (data, status, _pagination) => {
    //   if (status === kakao.maps.services.Status.OK) {
    //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    //     // LatLngBounds 객체에 좌표를 추가합니다
    //     const bounds = new kakao.maps.LatLngBounds();
    //     let markers = [];
    //     for (var i = 0; i < data.length; i++) {
    //       // @ts-ignore
    //       markers.push({
    //         position: {
    //           lat: data[i].y,
    //           lng: data[i].x,
    //         },
    //         content: data[i].place_name,
    //       });
    //       // @ts-ignore
    //       bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    //     }
    //     setMarkers(markers);

    //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    //     map.setBounds(bounds);
    //   }
    // });
    
  }, [map]);
  return (
    <Map // 로드뷰를 표시할 Container
      center={state.center}
      style={{
        width: "350px",
        height: "350px",
      }}
      level={3}
      onCreate={setMap}
    >
      {!state.isLoading && (
        <MapMarker position={state.center}>
          <div style={{ padding: "5px", color: "#000" }}>
            {state.errMsg ? state.errMsg : "현재위치가 맞나요?"}
          </div>
        </MapMarker>
      )}
      {/* {markers.map((marker) => (
        <MapMarker
        key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
        position={marker.position}
        onClick={() => setInfo(marker)}
        >
        {info && info.content === marker.content && (
            <div style={{ color: "#000" }}>{marker.content}</div>
        )}
        </MapMarker>
      ))} */}
    </Map>
  );
};
export default MapComp;
