// hard code wallet for demo
'use client';
import "../../globals.css";

const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY || ''

// import {
//   PublicClient,
//   createWalletClient,
//   createPublicClient,
//   defineChain,
//   getContract,
//   http,
//   WalletClient,
// } from 'viem';
// import { privateKeyToAccount } from 'viem/accounts';
// import { mantleSepoliaTestnet } from 'viem/chains';

export default function Page(): JSX.Element {

  // const config = {
  //   chain: mantleSepoliaTestnet,
  //   transport: http(),
  // }
  // const account = privateKeyToAccount(privateKey);
  // const client: WalletClient = createWalletClient({
  //   account,
  //   ...config,
  // });



  const vote = async (noteId: string, isHelpful: boolean) => {
    // TODO move to NFT

    // // TODO update deployed address
    // const contractAddress = '0x';

    // const params = {
    //   address: contractAddress,
    //   functionName: 'vote',
    //   args: [noteId, isHelpful],
    //   // abi: ABI,
    //   account,
    // };

    // const { request, result: runId } =
    //   await client.simulateContract(params);

    // const hash = await client.writeContract(params);


  }

  const talkDetails = {
    title: 'Overload the Execution Proposer: From MEV-Boost to ePBS to APS',
    speaker: 'Barnabé Monnot',
    speakerDescription: 'Robust Incentives Group (RIG), Ethereum Foundation',
    description: 'This talk describe how the MEV architecture evolves and their motivations. Proposing vs building rights'
  }

  const cards = [
    {
      "id": "0",
      "title": "MEV-Boost",
      "description": `**What it is**: MEV-Boost is a system that lets validators sell block-building rights.
      - **How it works**: Validators sign a commitment to block contents and sell the right to choose transaction order to a builder.
      - **Current setup**: This exchange is usually organized by a trusted relay.`
    },
    {
      "id": "1",
      "title": "Proposing vs. Building Rights",
      "description": ` **Proposing**: Validators sign off to approve block contents.
      - **Building**: Builders choose the order of transactions in a block.
      - **Today**: Validators sell building rights to builders.`,
      "referenceUrls": ["https://mirror.xyz/barnabe.eth/QJ6W0mmyOwjec-2zuH6lZb0iEI2aYFB9gE-LHWIMzjQ"]
    },

    {
      "id": "3",
      "title": "ePBS (Enshrined Payload Timeliness Committee)",
      "description": `**Purpose**: Ensures fair block building by creating trusted rules for the transaction ordering process.
      - **Designs**: Concepts like PTC (Payload Timeliness Committee) help maintain fairness in ordering transactions.`
    }
  ]

  return (
    <main className="font-mono container w-3/4 bg-blue m-20">
      <div>
        <h2 className="text-4xl pb-2">
          {talkDetails.title}
        </h2>
      </div>
      <div className="text-lg">
        <h3>
          {talkDetails.speaker}
        </h3>
      </div>
      <div className="text-sm pt-8">
        {talkDetails.description}
      </div>
      <div className="text-2xl pt-10">

        <h3>Community Notes</h3>

      </div>
      <div>
        <div className="flex flex-col text-lg ">
          {
            cards.map(
              card => (
                <div className="rounded-lg bg-slate-600 m-5 p-5">
                  <h5 className="text-xl font-bold">{card.title}</h5>
                  <p>{card.description}</p>
                  {card.referenceUrls?.length && (
                    card.referenceUrls.map(
                      url => (
                        <div>
                          <a className="bg-blue-500" href={url}>reference
                          </a>
                        </div>
                      )
                    )
                  )}
                  <div className="flex flex-row">
                    <div className="relative mr-5"><button onClick={() => vote(card.id, true)}
                      className="btn btn-outline text-white">✅ Helpful</button></div>
                    <div className="relative ml-5"><button onClick={() => vote(card.id, false)}
                      className="btn btn-outline text-white">✖️ Not Helpful</button></div>
                  </div>
                </div>
              )
            )
          }


        </div>
      </div>



      <div className="p-5">
        <h3 className="text-lg">Create a Note for the community</h3>

        <textarea id="suggestion-textarea" placeholder="Add Note" className="textarea textarea-bordered textarea-lg w-11/12 p-5" ></textarea>
        <div id="submit-button"
          className="flex flex-row-reverse w-full"><button className="btn btn-outline text-white text-xl">Submit</button></div>
      </div >

    </main>

  )
}
