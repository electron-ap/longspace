import React from 'react'

function Staff() {
  return (
    <div>
      <div className='admin-wraper'>
        <div className="admin-sort-tent">
            <div className="favorites-box">
                <div className="frts-tle">当前成员：6 <span className="add-members">申请增加成员+</span></div>
                <div className="frts-tent">
                    <ul className="member-ul">
                        <li className="member-li">
                            <div className="member-li-box">
                                <img className="member-img" src={require('../../assets/admin/headpc.png')} alt="" />
                                <div className="member-li-tle">张三</div>
                                <div className="member-li-p">123@123.com</div>
                                  <ul className="member-chengeli">
                                    <li><span>学习中</span><p>12</p></li>
                                    <li><span>已完成</span><p>3</p></li>
                                    <li><span>考试</span><p>2</p></li>
                                    <li><span>证书</span><p>2</p></li>
                                  </ul>  
                                <div className="member-setup">
                                  <button className="member-up">课程设置</button>
                                  <button className="member-remove">删除</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
   
    </div>
  )
}

export default Staff