import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const useFetch = (url) => {
	const [ meterData, setMeterData ] = useState(null);
	const [ treeData, setTreeData ] = useState(null);
	const [ meterDataByID, setMeterDataByID] = useState(null);

	useEffect(() => {
		async function fetchData() {
			var resquestType = {
				key: 'StartGRID2020',
				SQLQuery: `SELECT * FROM  MeterLocation`
			};
			const request = new Request(`https://stargridx.net/MeterGeolocation.php`, {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify(resquestType)
			});
			const api_call = await fetch(request);
			const data = await api_call.json();
			var tree_data = [];
			for(let i = 0 ; i < data.Server_response.length ; i++){
				var tmp = data.Server_response[i].PowerSupply;
				if(tree_data.length === 0) tree_data.push(tmp);
				else{
					var j = 0;
					for( ; j < tree_data.length ; j++){
						if(tree_data[j] === tmp) break;
					}
					if( j === tree_data.length) tree_data.push(tmp);
				}
			}
			setTreeData(tree_data);
			var meter_data = [];
			for (let j = 0 ; j < tree_data.length ; j++){
				meter_data[tree_data[j]] = [];
			}
			for( let i = 0 ; i < data.Server_response.length ; i++){
				meter_data[data.Server_response[i].PowerSupply].push(data.Server_response[i]);
			}
			setMeterData(meter_data);
			var meter_data_by_ID = [];
			for ( let i = 0 ; i < data.Server_response.length ; i++){
				meter_data_by_ID[data.Server_response[i].ID] = data.Server_response[i];
			}
			setMeterDataByID(meter_data_by_ID);
		}
		fetchData();
	}, []);

	return { meterData, treeData, meterDataByID };
};

export default function TreeStructure() {
	const url = 'https://cors-anywhere.herokuapp.com/https://stargridx.net/MeterInfo2.php';
	const { meterData, treeData, meterDataByID } = useFetch(url);
	const history = useHistory();

	const handleSelect = (e, value) => {
		if(meterDataByID[value] != null){
			history.push({
				pathname: '/MeterProps/DataOverView',
				state: {meter: meterDataByID[value]}
			});
		}
	}

	return (
		<TreeView
			sx={{
				height: 240,
				flexGrow: 1,
				maxWidth: 400
			}}
			onNodeSelect={handleSelect}
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}>
			{treeData != null &&
				treeData.map((meterTreeNode) => {
					return(
						<TreeItem key={meterTreeNode} nodeId={meterTreeNode} label={meterTreeNode}>
						{meterData != null &&
							meterData[meterTreeNode].map((meter) => {
								return(
									<TreeItem key={meter.ID} nodeId={meter.ID} label={meter.MeterNumber} />
								)
							})
						}
						</TreeItem>
					)
				})
			}
		</TreeView>
	);
}
