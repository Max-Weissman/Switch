import React from 'react';

const SliderInfo = (props) => {

    const owners = () => {
        if (props.info){
            let info = props.info
            let checks = []
            let owners = props.owners
            checks.push(<div key={0} className="user">
                            <div className="own checked label" >Owners</div>
                            <div className="own checked label" >Completed</div>
                        </div>)
            for (let i = 0; i < owners.length; i++){
                let owner = owners[i]
                let own = "unchecked"
                let complete = "unchecked"
                if (info[owner.name + "Own"]){
                    own = "checked"
                }
                if (info[owner.name + "Complete"]){
                    complete = "checked"
                }
                checks.push(<div key={i + 1} className="user">
                                <div className={`own ${own}`} onClick={() => checkingOwn(info, owner.name)}>{owner.name}</div>
                                <div className={`complete ${complete}`} onClick={() => checkingComplete(info, owner.name)}>{owner.name}</div>
                            </div>)
            }
            return checks
        }
        return <div></div>
    }

    const checkingOwn = (info, owner) => {
        props.checkOwn(info, owner)
        props.settingOwn(info, owner)
    }

    const checkingComplete = (info, owner) =>{
        props.checkComplete(info, owner)
        props.settingComplete(info,owner)
    }

    return <div className='slider'>
                <div className="gameName">{props.info.title}</div>
                <div className="checks">{owners()}</div>
           </div>
}

export default SliderInfo