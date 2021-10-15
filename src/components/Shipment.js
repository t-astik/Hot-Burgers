import React from 'react';
import PropTypes from 'prop-types';



class Shipment extends React.Component {


    static propTypes = {
        total: PropTypes.number,
    }

    render() {

        const { total } = this.props;
        const shippning = total > 0 && total < 500 ? 350 : 99;
        const shippningNeon = 
            shippning === 99 ? (
                <span className='font-effect-neon total_wrap-cheap'>{shippning} ₽</span>
            ) : (
                <span>{shippning} ₽</span>
            )
        return(
            <div className='total'>
                    <div className='total_wrap'>
                        <div>
                            <div>Доставка: {total > 0 ? shippningNeon : null}</div>
                            <div className='total_wrap-free'>
                                {total < 500 ? `Закажите еще на ${500-total} ₽ для доставка за 99 ₽` : null }
                            </div>
                        </div>
                        <div className='total_wrap-fial'>
                            Итого: {total}
                        </div>
                    </div>
                </div>
        );
    }
}

export default Shipment;