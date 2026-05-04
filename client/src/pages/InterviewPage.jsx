import { useState } from "react"
import Step1setUp from "../components/Step1setUp"
import Step2interview from "../components/Step2Interview"
import Step3Report from "../components/Step3Report"

function InterviewPage() {
    const [step,setStep] = useState(1)
    const [interviewData, setInterviewData] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
        {step===1&&(
            <Step1setUp onStart={(data)=>{setInterviewData(data);
                setStep(2)
            }}/>
        )}
        {step===2&&(
            <Step2interview interviewData={interviewData}
            onFinish={(report)=>{setInterviewData(report)
                setStep(3)
            }} />
        )}
        {step===3&&(
            <Step3Report report={interviewData}/>
        )}
    </div>
  )
}

export default InterviewPage