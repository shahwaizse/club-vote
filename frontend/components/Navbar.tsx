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
              <button className='ml-4 bg-white p-1 rounded-md text-black' onClick={() => {disconnect()}}>Disconnect</button>
            </div>
            :
            <div>
              <button className='bg-green' onClick={() => {connect({ connector: metaMask() })}}>Connect</button>
            </div>
          }
        </div>
    );
}