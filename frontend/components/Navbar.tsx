import { useAccount, useDisconnect, useConnect } from 'wagmi'
import { metaMask } from 'wagmi/connectors'

export default function Navbar() {
    const { connect } = useConnect()
    const { address } = useAccount()
    const { disconnect } = useDisconnect()

    return (
        <div>
          {
            address
            ?
            <div>
              {address}
              <button onClick={() => {disconnect()}}>Disconnect</button>
            </div>
            :
            <div>
              <button className='bg-green' onClick={() => {connect({ connector: metaMask() })}}>Connect</button>
            </div>
          }
        </div>
    );
}