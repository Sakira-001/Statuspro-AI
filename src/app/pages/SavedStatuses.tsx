import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Copy, Trash2, Search, BookmarkCheck } from 'lucide-react';
import { toast } from 'sonner';

interface SavedStatus {
  id: string;
  content: string;
  type: string;
  niche: string;
  createdAt: string;
}

export default function SavedStatuses() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock saved statuses
  const [savedStatuses, setSavedStatuses] = useState<SavedStatus[]>([
    {
      id: '1',
      content: '🔥 Let me be honest with you\n\nYou\'ve been seeing my Skincare products posts for a while now, right?\n\nThere\'s a reason. It\'s not just another product. This is the real deal for Working moms.\n\nWhen you\'re ready to see results (not just promises), slide into my DM.\n\nPrice: ₦5000\n\nNo tire-kickers please 💯\n\nReady buyers only →',
      type: 'Attraction Post',
      niche: 'Skincare products',
      createdAt: '2026-02-25',
    },
    {
      id: '2',
      content: 'Quick story 👀\n\nA customer just texted me - she made back her investment in 2 weeks.\n\nTWO WEEKS. 😱\n\nSame Digital courses some of you are still doubting.\n\nBut she took action. No excuses. No "let me think about it".\n\nNow she\'s winning.\n\nYou ready to start your own story? ₦10000\n\nDM = Your buy button 🚀',
      type: 'Story-Based Selling',
      niche: 'Digital courses',
      createdAt: '2026-02-24',
    },
    {
      id: '3',
      content: '⏰ Everyone will buy eventually\n\nBut some will pay more.\n\nThis Footwear price increases Monday next week. Period.\n\nToday: ₦8000\nNext week: ₦10000\n\nYour choice. Buy smart now, or pay extra later 🤷‍♂️\n\nReady? Slide into my DM ⚡',
      type: 'Scarcity & Urgency',
      niche: 'Footwear',
      createdAt: '2026-02-23',
    },
    {
      id: '4',
      content: 'Omo see gist 👀\n\nOne babe just tell me say she don collect her money back inside 2 weeks.\n\n2 WEEKS! 😱\n\nNa this same Fashion accessories wey some of una dey price like say na banana.\n\nBut she follow instruction, she no dey play. Now she dey chop better money.\n\nYou wan join? Na ₦6000. That\'s all.\n\nDM = Buy button 🚀',
      type: 'Testimonial Style',
      niche: 'Fashion accessories',
      createdAt: '2026-02-22',
    },
  ]);

  const filteredStatuses = savedStatuses.filter(
    (status) =>
      status.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      status.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      status.niche.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard!');
  };

  const handleDelete = (id: string) => {
    setSavedStatuses(statuses => statuses.filter(s => s.id !== id));
    toast.success('Status deleted');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Statuses</h1>
        <p className="text-gray-600">All your saved WhatsApp statuses in one place</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search by content, type, or niche..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold text-gray-900">{savedStatuses.length}</div>
          <div className="text-sm text-gray-600">Total Saved</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-gray-900">
            {new Set(savedStatuses.map(s => s.niche)).size}
          </div>
          <div className="text-sm text-gray-600">Different Niches</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-gray-900">
            {new Set(savedStatuses.map(s => s.type)).size}
          </div>
          <div className="text-sm text-gray-600">Status Types</div>
        </Card>
      </div>

      {/* Saved Statuses List */}
      {filteredStatuses.length > 0 ? (
        <div className="grid gap-4">
          {filteredStatuses.map((status) => (
            <Card key={status.id} className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{status.type}</Badge>
                    <Badge variant="outline">{status.niche}</Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    Saved on {new Date(status.createdAt).toLocaleDateString('en-NG', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>

              <Textarea
                value={status.content}
                readOnly
                className="min-h-[180px] mb-4 font-normal resize-none"
              />

              <div className="flex gap-2">
                <Button
                  onClick={() => handleCopy(status.content)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy to Clipboard
                </Button>
                <Button
                  onClick={() => handleDelete(status.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <BookmarkCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchQuery ? 'No statuses found' : 'No saved statuses yet'}
          </h3>
          <p className="text-gray-600">
            {searchQuery
              ? 'Try adjusting your search query'
              : 'Generate and save statuses to see them here'}
          </p>
        </Card>
      )}
    </div>
  );
}
