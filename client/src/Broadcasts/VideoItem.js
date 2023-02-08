import moment from 'moment';
import { ReactPlayerWrapper } from '../ReactPlayerWrapper/ReactPlayerWrapper';

export const VideoItem = ({video}) => video ? <div className="broadcast-video-item">
<ReactPlayerWrapper url={video?.url}/>
<h3 className='broadcast-video-item-title'>{video?.title}</h3>
<p className='broadcast-video-item-date'>{moment(video.date).format('MMM Do, YYYY')}</p>
</div> : ''