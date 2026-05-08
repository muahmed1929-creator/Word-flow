-- Create a profiles table for user details
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table for user usage tracking
CREATE TABLE IF NOT EXISTS public.usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  words_used INTEGER DEFAULT 0,
  words_limit INTEGER DEFAULT 1000, -- Free: 1000, Pro: 10000, Business: 100000
  plan TEXT DEFAULT 'Free', -- 'Free', 'Pro', 'Business'
  last_reset_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table for content generation history
CREATE TABLE IF NOT EXISTS public.history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  keywords TEXT,
  intent TEXT,
  tone TEXT,
  language TEXT,
  content_length TEXT,
  generated_content TEXT,
  words_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.history ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Usage Policies
CREATE POLICY "Users can view their own usage." ON public.usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own usage." ON public.usage
  FOR UPDATE USING (auth.uid() = user_id);

-- History Policies
CREATE POLICY "Users can view their own history." ON public.history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own history." ON public.history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own history." ON public.history
  FOR DELETE USING (auth.uid() = user_id);

-- Trigger to create profile and usage record on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');

  INSERT INTO public.usage (user_id, words_used, words_limit, plan)
  VALUES (NEW.id, 0, 1000, 'Free');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
