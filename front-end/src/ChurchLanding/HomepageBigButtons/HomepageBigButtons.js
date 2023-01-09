import { HomepageBigButton } from "./HomepageBigButton";
import GivingModal from "../../GivingModal";
import bulletinIcon from '../../images/bulletin-icon.png'
import broadcastIcon from '../../images/broadcast-icon.png'
import givingIcon from '../../images/giving-icon.png'
import prayerRequestIcon from '../../images/prayer-requests-icon.png'


export const HomepageBigButtons = ({currentUser, setGivingIsOpen, givingIsOpen}) => <div className="homepage-big-buttons">
    <div className='container'>
        <div className='row'>
            <div className='col-12 col-sm-6'>
                <HomepageBigButton icon={bulletinIcon} identifier={'bulletin'} label={'Bulletin'} to={'/events'} useDefaultAnchor/>
            </div>
            <div className='col-12 col-sm-6'>
                <HomepageBigButton icon={givingIcon} identifier={'giving'} label={'Giving'} onClick={() => setGivingIsOpen(true)}/>
            </div>
            <div className='col-12 col-sm-6'>
                <HomepageBigButton icon={broadcastIcon} identifier={'broadcasts'} label={'Broadcasts'} to={'/broadcasts'} />
            </div>
            <div className='col-12 col-sm-6'>
                <HomepageBigButton icon={prayerRequestIcon} identifier={'prayer-requests'} label={'Prayer Requests'} to={'/prayer_requests'} />
            </div>
        </div>
    </div>
    <GivingModal currentUser={currentUser} givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen}/>
</div>
