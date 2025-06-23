
<Cabbage>[
{"type":"form","caption":"Cabbage React Example","size":{"width":500,"height":400},"pluginId":"plug"},
{"type":"verticalSlider","channel":"Feedback","bounds":{"left":20,"top":100,"width":80,"height":180}, "text":"Feedback", "range":{"min":0,"max":1,"defaultValue":0.5,"skew":1,"increment":0.02}},
{"type":"verticalSlider","channel":"Cutoff","bounds":{"left":100,"top":100,"width":80,"height":180}, "text":"Cutoff", "range":{"min":0,"max":20000,"defaultValue": 10000,"skew":1,"increment":200}},
{"type":"verticalSlider","channel":"HighPass","bounds":{"left":260,"top":100,"width":80,"height":180}, "text":"Filter", "range":{"min":0,"max":20000,"defaultValue":20,"skew":1,"increment":200}},
{"type":"verticalSlider","channel":"LowPass","bounds":{"left":180,"top":100,"width":80,"height":180}, "text":"Filter", "range":{"min":0,"max":20000,"defaultValue":20000,"skew":1,"increment":200}},
{"type":"verticalSlider","channel":"Mix","bounds":{"left":340,"top":100,"width":80,"height":180}, "text":"Mix", "range":{"min":0,"max":1,"defaultValue":0.5,"skew":1,"increment":0.01}}
]</Cabbage>
<CsoundSynthesizer>
<CsOptions>
-n -d
</CsOptions>
<CsInstruments>
; Initialize the global variables. 
ksmps = 32
nchnls = 2
0dbfs = 1

instr 1
    aInL inch 1
	aInR inch 2
	
	kFeedback cabbageGetValue "Feedback"
    kCutoff cabbageGetValue "Cutoff"
	kCutoffHP cabbageGetValue "HighPass"
    kCutoffLP cabbageGetValue "LowPass"
    kMix cabbageGetValue "Mix"

 	// Apply stereo reverb
    aRevL, aRevR reverbsc aInL, aInR, kFeedback, kCutoff

    // Apply filters with clfilt (1=highpass, 0=lowpass)
    aFltL clfilt aRevL, limit(kCutoffHP, 20, 20000), 1, 2
    aFltL clfilt aFltL, limit(kCutoffLP, 20, 20000), 0, 2

    aFltR clfilt aRevR, limit(kCutoffHP, 20, 20000), 1, 2
    aFltR clfilt aFltR, limit(kCutoffLP, 20, 20000), 0, 2

	// Mix dry and wet
	aOutL = (1 - kMix) * aInL + kMix * aFltL
	aOutR = (1 - kMix) * aInR + kMix * aFltR

    outs aOutL, aOutR
endin

</CsInstruments>
<CsScore>
;causes Csound to run for about 7000 years...
i1 0 z
</CsScore>
</CsoundSynthesizer>