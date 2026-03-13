import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Sparkles, Copy, RefreshCw, Loader2, BookmarkPlus, Check } from 'lucide-react';
import { toast } from 'sonner';

interface GeneratedStatus {
  id: string;
  content: string;
  saved: boolean;
}

export default function GenerateStatus() {
  const [generating, setGenerating] = useState(false);
  const [generatedStatuses, setGeneratedStatuses] = useState<GeneratedStatus[]>([]);
  const [formData, setFormData] = useState({
    niche: '',
    targetAudience: '',
    priceRange: '',
    tone: 'soft',
    language: 'english',
    statusType: 'attraction',
  });

  const statusTypes = [
    { value: 'attraction', label: 'Attraction Post' },
    { value: 'story', label: 'Story-Based Selling' },
    { value: 'testimonial', label: 'Testimonial Style' },
    { value: 'scarcity', label: 'Scarcity & Urgency' },
    { value: 'objection', label: 'Objection Crusher' },
    { value: 'price', label: 'Price Justifier' },
    { value: 'authority', label: 'Authority Builder' },
    { value: 'weekend', label: 'Weekend Rush' },
    { value: 'newmonth', label: 'New Month Push' },
    { value: 'direct', label: 'Direct Sales Blast' },
  ];

  const handleGenerate = async () => {
    if (!formData.niche || !formData.targetAudience || !formData.priceRange) {
      toast.error('Please fill in all required fields');
      return;
    }

    setGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockStatuses: GeneratedStatus[] = [
        {
          id: '1',
          content: formData.language === 'pidgin' 
            ? `🔥 Abeg make we talk true talk\n\nYou don dey see this ${formData.niche} wey I dey sell abi?\n\nNa because e good pass. No be say I wan do like say I be only person wey sabi sell am, but my own different.\n\nIf you wan see wetin your money fit do for you, ping me sharp sharp. Price na ₦${formData.priceRange}.\n\nBut no come price me for DM o 😂\n\nReady buyers only 💯`
            : `🔥 Let me be honest with you\n\nYou've been seeing my ${formData.niche} posts for a while now, right?\n\nThere's a reason. It's not just another product. This is the real deal for ${formData.targetAudience}.\n\nWhen you're ready to see results (not just promises), slide into my DM.\n\nPrice: ₦${formData.priceRange}\n\nNo tire-kickers please 💯\n\nReady buyers only →`,
          saved: false,
        },
        {
          id: '2',
          content: formData.language === 'pidgin'
            ? `Omo see gist 👀\n\nOne babe just tell me say she don collect her money back inside 2 weeks.\n\n2 WEEKS! 😱\n\nNa this same ${formData.niche} wey some of una dey price like say na banana.\n\nBut she follow instruction, she no dey play. Now she dey chop better money.\n\nYou wan join? Na ₦${formData.priceRange}. That's all.\n\nDM = Buy button 🚀`
            : `Quick story 👀\n\nA customer just texted me - she made back her investment in 2 weeks.\n\nTWO WEEKS. 😱\n\nSame ${formData.niche} some of you are still doubting.\n\nBut she took action. No excuses. No "let me think about it".\n\nNow she's winning.\n\nYou ready to start your own story? ₦${formData.priceRange}\n\nDM = Your buy button 🚀`,
          saved: false,
        },
        {
          id: '3',
          content: formData.language === 'pidgin'
            ? `⏰ Last last everybody go buy\n\nBut some people go pay more money pass.\n\nThis ${formData.niche} price go increase next week Monday. No be joke.\n\nNow now e be ₦${formData.priceRange}. Small time e go be ₦${parseInt(formData.priceRange) + 2000}.\n\nNa you sabi. Buy now, thank me later 🤷‍♂️\n\nOr pay more later. Your choice.\n\nReady? Drop DM ⚡`
            : `⏰ Everyone will buy eventually\n\nBut some will pay more.\n\nThis ${formData.niche} price increases Monday next week. Period.\n\nToday: ₦${formData.priceRange}\nNext week: ₦${parseInt(formData.priceRange) + 2000}\n\nYour choice. Buy smart now, or pay extra later 🤷‍♂️\n\nReady? Slide into my DM ⚡`,
          saved: false,
        },
        {
          id: '4',
          content: formData.language === 'pidgin'
            ? `Forget all this noise online\n\nIf ${formData.niche} no dey important for ${formData.targetAudience}, I for no dey sell am.\n\nSimple.\n\nI no get time to dey sell person rubbish. My reputation too important.\n\n₦${formData.priceRange} na small thing compare to wetin you go gain.\n\nNo waste time. Text me make we do business 📱`
            : `Let's cut the noise\n\nIf ${formData.niche} wasn't crucial for ${formData.targetAudience}, I wouldn't sell it.\n\nPeriod.\n\nMy reputation means everything. I don't deal in trash.\n\n₦${formData.priceRange} is nothing compared to what you'll gain.\n\nStop overthinking. Text me and let's do business 📱`,
          saved: false,
        },
        {
          id: '5',
          content: formData.language === 'pidgin'
            ? `🎯 Weekend Special\n\nYou know say weekend na when sense suppose reset, abi?\n\nMake I help you. This ${formData.niche} na exactly wetin you need.\n\nPrice: ₦${formData.priceRange}\nDelivery: ASAP\nYour excuse: None 😂\n\nBefore Monday reach and you come dey regret, just buy am now.\n\nDM open like 24/7 shop 🔓`
            : `🎯 Weekend Special\n\nYou know what weekends are for? Making smart decisions.\n\nLet me help you make one. This ${formData.niche} is exactly what you need.\n\nPrice: ₦${formData.priceRange}\nDelivery: ASAP\nYour excuse: Invalid 😂\n\nBefore Monday blues hit and you regret waiting, just grab it now.\n\nDM is wide open 🔓`,
          saved: false,
        },
      ];

      setGeneratedStatuses(mockStatuses);
      setGenerating(false);
      toast.success('Statuses generated successfully!');
    }, 2000);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard!');
  };

  const handleSave = (id: string) => {
    setGeneratedStatuses(statuses =>
      statuses.map(status =>
        status.id === id ? { ...status, saved: true } : status
      )
    );
    toast.success('Status saved!');
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate WhatsApp Status</h1>
        <p className="text-gray-600">Fill in the details below to generate high-converting statuses</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="niche">Business Niche *</Label>
              <Input
                id="niche"
                placeholder="e.g., Skincare products, Digital courses, Footwear"
                value={formData.niche}
                onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience *</Label>
              <Input
                id="audience"
                placeholder="e.g., Working moms, University students, Young professionals"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price Range *</Label>
              <Input
                id="price"
                type="text"
                placeholder="e.g., 5000, 10000-15000"
                value={formData.priceRange}
                onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="statusType">Status Type</Label>
              <Select value={formData.statusType} onValueChange={(value) => setFormData({ ...formData, statusType: value })}>
                <SelectTrigger id="statusType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tone</Label>
              <RadioGroup value={formData.tone} onValueChange={(value) => setFormData({ ...formData, tone: value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="soft" id="soft" />
                  <Label htmlFor="soft" className="font-normal">Soft (Friendly)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="aggressive" id="aggressive" />
                  <Label htmlFor="aggressive" className="font-normal">Aggressive (Direct)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Language</Label>
              <RadioGroup value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="english" id="english" />
                  <Label htmlFor="english" className="font-normal">English</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pidgin" id="pidgin" />
                  <Label htmlFor="pidgin" className="font-normal">Pidgin (Naija style)</Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 w-5 h-5" />
                  Generate Status
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          {generatedStatuses.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Generated Statuses</h2>
                <Button
                  onClick={handleRegenerate}
                  variant="outline"
                  size="sm"
                  disabled={generating}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
              </div>

              <div className="space-y-4">
                {generatedStatuses.map((status) => (
                  <Card key={status.id} className="p-4">
                    <Textarea
                      value={status.content}
                      readOnly
                      className="min-h-[200px] mb-3 font-normal resize-none"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleCopy(status.content)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        onClick={() => handleSave(status.id)}
                        variant={status.saved ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        disabled={status.saved}
                      >
                        {status.saved ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Saved
                          </>
                        ) : (
                          <>
                            <BookmarkPlus className="w-4 h-4 mr-2" />
                            Save
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}

          {generatedStatuses.length === 0 && !generating && (
            <Card className="p-12 text-center">
              <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No statuses yet</h3>
              <p className="text-gray-600">Fill in the form and click generate to create your first status</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
